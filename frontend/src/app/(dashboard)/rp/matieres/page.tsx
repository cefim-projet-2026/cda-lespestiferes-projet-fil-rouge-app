"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMatieres, useCreateMatiere, useUtilisateurs } from "@/hooks";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  Card,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { Plus, BookOpen, GraduationCap, Percent, Search } from "lucide-react";

const matiereSchema = z.object({
  nom: z.string().min(2, "Nom trop court"),
  coefficient: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, "Le coefficient doit être positif"),
  formateurId: z.string().optional(),
});

type MatiereFormData = z.infer<typeof matiereSchema>;

export default function MatieresPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Queries
  const { data: matieres, isLoading } = useMatieres();
  const { data: formateurs } = useUtilisateurs({ role: "FORMATEUR" });

  // Mutation
  const createMutation = useCreateMatiere();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MatiereFormData>({
    resolver: zodResolver(matiereSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        formateurId: data.formateurId ? parseInt(data.formateurId) : undefined,
      });
      setIsDialogOpen(false);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMatieres = matieres?.content.filter((m) =>
    m.nom.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Gestion <span className="text-primary">Matières</span>
          </h1>
          <p className="text-slate-400">
            Définissez le programme académique et les coefficients.
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          leftIcon={<Plus className="size-4" />}
          className="rounded-[1.25rem]"
        >
          Nouvelle Matière
        </Button>
      </div>

      <Card>
        <CardHeader
          title="Toutes les matières"
          description="Liste des disciplines enseignées dans l'établissement."
          action={
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Rechercher une matière..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          }
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Matière</TableHeader>
              <TableHeader>Coefficient</TableHeader>
              <TableHeader>Intervenant</TableHeader>
              <TableHeader className="text-right">Progression</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center animate-pulse text-[var(--on-surface-variant)]"
                  >
                    Chargement...
                  </TableCell>
                </TableRow>
              ))
            ) : filteredMatieres?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-12 text-center text-[var(--on-surface-variant)] font-medium"
                >
                  Aucune matière trouvée.
                </TableCell>
              </TableRow>
            ) : (
              filteredMatieres?.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-white tracking-wide">
                          {m.nom}
                        </p>
                        <p className="text-xs text-slate-500 uppercase font-black">
                          Code: MAT-{m.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-1 px-2.5 rounded-lg bg-white/5 border border-white/5 text-primary font-black text-sm">
                        x{m.coefficient}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-300">
                      <GraduationCap className="w-4 h-4 text-slate-500" />
                      <span className="font-medium">
                        {m.formateur
                          ? `${m.formateur.prenom} ${m.formateur.nom}`
                          : "Non assigné"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="w-24 h-1.5 bg-white/5 rounded-full ml-auto overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* CREATE DIALOG */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Création d'une matière"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Intitulé de la matière"
            placeholder="Ex: Programmation Java"
            {...register("nom")}
            error={errors.nom?.message}
            leftIcon={<BookOpen className="w-4 h-4" />}
          />

          <Input
            label="Coefficient"
            placeholder="Ex: 4.5"
            type="number"
            step="0.1"
            {...register("coefficient")}
            error={errors.coefficient?.message}
            leftIcon={<Percent className="w-4 h-4" />}
          />

          <Select
            label="Formateur référent (Optionnel)"
            options={[
              { label: "Aucun intervenant pour le moment", value: "" },
              ...(formateurs?.content.map((f) => ({
                label: `${f.prenom} ${f.nom}`,
                value: f.id,
              })) || []),
            ]}
            {...register("formateurId")}
            error={errors.formateurId?.message}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setIsDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" isLoading={createMutation.isPending}>
              Créer la matière
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
