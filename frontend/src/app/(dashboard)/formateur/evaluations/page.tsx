"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";
import {
  useEvaluations,
  useCreateEvaluation,
  useClasses,
  useMatieres,
} from "@/hooks";
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
import {
  Plus,
  Notebook,
  Calendar,
  Percent,
  BookOpen,
  Layout,
  Search,
  Trash2,
  Edit,
} from "lucide-react";

const evaluationSchema = z.object({
  nom: z.string().min(2, "Nom trop court"),
  date: z.string().min(1, "Date requise"),
  coefficient: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, "Le coefficient doit être positif"),
  matiereId: z.string().min(1, "Matière requise"),
  classeId: z.string().min(1, "Classe requise"),
});

type EvaluationFormData = z.infer<typeof evaluationSchema>;

export default function EvaluationsPage() {
  const { user } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: evaluations, isLoading } = useEvaluations();
  const { data: classes } = useClasses({ formateurId: user?.id });
  const { data: matieres } = useMatieres({ formateurId: user?.id });

  const createMutation = useCreateEvaluation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EvaluationFormData>({
    resolver: zodResolver(evaluationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        matiereId: parseInt(data.matiereId),
        classeId: parseInt(data.classeId),
      });
      setIsDialogOpen(false);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  // Filter evaluations to only show those for the formateur's classes
  const filteredEvaluations = evaluations?.content.filter((ev) => {
    const matchesSearch = ev.nom
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // In a real scenario, the backend would filter evaluations by the formateur's classes.
    // If the backend returns all, we might want to filter them here based on the classes results we have.
    // Assuming for now the backend provides the relevant ones or we show all for simplicity if allowed.
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 uppercase tracking-tighter">
            Mes <span className="text-primary">Évaluations</span>
          </h1>
          <p className="text-slate-400 font-medium">
            Programmez vos contrôles et gérez les coefficients par matière.
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          leftIcon={<Plus className="size-4" />}
          className="rounded-[1.25rem]"
        >
          Nouvelle Évaluation
        </Button>
      </div>

      <Card>
        <CardHeader
          title="Historique des contrôles"
          description="Liste des évaluations passées et à venir."
          action={
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Rechercher par nom..."
                className="w-full bg-[#030303]/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          }
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Évaluation</TableHeader>
              <TableHeader>Matière</TableHeader>
              <TableHeader>Classe</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Coef.</TableHeader>
              <TableHeader className="text-right">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center animate-pulse text-[var(--on-surface-variant)]"
                  >
                    Chargement des données...
                  </TableCell>
                </TableRow>
              ))
            ) : filteredEvaluations?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-[var(--on-surface-variant)]"
                >
                  <Notebook className="w-12 h-12 mx-auto mb-4 opacity-5" />
                  <p className="font-medium">Aucune évaluation enregistrée.</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredEvaluations?.map((ev) => (
                <TableRow key={ev.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Notebook className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-bold text-white uppercase tracking-tight">
                        {ev.nom}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-400">
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs font-semibold">
                        {ev.matiere?.nom || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Layout className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        {ev.classe?.nom || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs font-mono">
                        {new Date(ev.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-black text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                      x{ev.coefficient}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
        title="Nouvelle Évaluation"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Nom du contrôle"
            placeholder="Ex: DST Semaine 12"
            {...register("nom")}
            error={errors.nom?.message}
            leftIcon={<Notebook className="w-4 h-4" />}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              {...register("date")}
              error={errors.date?.message}
              leftIcon={<Calendar className="w-4 h-4" />}
            />
            <Input
              label="Coefficient"
              type="number"
              step="0.5"
              placeholder="Ex: 2"
              {...register("coefficient")}
              error={errors.coefficient?.message}
              leftIcon={<Percent className="w-4 h-4" />}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Matière"
              options={[
                { label: "Choisir la matière", value: "" },
                ...(matieres?.content.map((m) => ({
                  label: m.nom,
                  value: m.id,
                })) || []),
              ]}
              {...register("matiereId")}
              error={errors.matiereId?.message}
            />
            <Select
              label="Classe"
              options={[
                { label: "Choisir la classe", value: "" },
                ...(classes?.content.map((c) => ({
                  label: c.nom,
                  value: c.id,
                })) || []),
              ]}
              {...register("classeId")}
              error={errors.classeId?.message}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setIsDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" isLoading={createMutation.isPending}>
              Créer l'évaluation
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
