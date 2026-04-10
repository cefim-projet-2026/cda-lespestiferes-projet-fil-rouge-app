"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useClasses, useCreateClasse, useUtilisateurs } from "@/hooks";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import {
  Plus,
  Users,
  Layout,
  GraduationCap,
  TrendingUp,
  Search,
} from "lucide-react";
import { getGradeColor } from "@/lib/utils/grades";

const classeSchema = z.object({
  nom: z.string().min(2, "Nom trop court"),
  promotion: z.string().min(1, "Promotion requise"),
  formateurId: z.string().optional(),
});

type ClasseFormData = z.infer<typeof classeSchema>;

export default function ClassesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Queries
  const { data: classes, isLoading } = useClasses();
  const { data: formateurs } = useUtilisateurs({ role: "FORMATEUR" });

  // Mutation
  const createMutation = useCreateClasse();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClasseFormData>({
    resolver: zodResolver(classeSchema),
  });

  const onSubmit = async (data: ClasseFormData) => {
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

  const filteredClasses = classes?.content.filter((c) =>
    `${c.nom} ${c.promotion}`.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Gestion <span className="text-primary">Classes</span>
          </h1>
          <p className="text-slate-400">
            Organisez les promotions et affectez les formateurs référents.
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="rounded-2xl"
        >
          Nouvelle Classe
        </Button>
      </div>

      <div className="flex items-center gap-4 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher une classe..."
            className="w-full bg-[#0a0a0b] border border-[#1f1f22] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-56 bg-[#0a0a0b] rounded-2xl border border-[#1f1f22] animate-pulse"
            />
          ))
        ) : filteredClasses?.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-[#0a0a0b] rounded-2xl border border-[#1f1f22] text-slate-500">
            <Layout className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p className="text-lg font-medium">Aucune classe pour le moment.</p>
          </div>
        ) : (
          filteredClasses?.map((classe) => (
            <Card
              key={classe.id}
              className="group relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-primary/20">
                  Active
                </div>
              </div>

              <CardHeader
                title={classe.nom}
                className="border-none pb-2"
                description={`Promo: ${classe.promotion}`}
              />

              <CardContent className="flex-1 pt-0 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <GraduationCap className="w-4 h-4" />
                      <span>Référent</span>
                    </div>
                    <span className="text-white font-medium">
                      {classe.formateur
                        ? `${classe.formateur.prenom} ${classe.formateur.nom}`
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Users className="w-4 h-4" />
                      <span>Effectif</span>
                    </div>
                    <span className="text-white font-medium">
                      {classe.nbEleves || 0} élèves
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1f1f22] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Moyenne Générale
                    </p>
                    <p
                      className={`text-2xl font-black ${getGradeColor(classe.moyenneGenerale || 0)}`}
                    >
                      {classe.moyenneGenerale?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 shadow-inner">
                    <TrendingUp
                      className={`w-5 h-5 ${getGradeColor(classe.moyenneGenerale || 0)} opacity-60`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* CREATE DIALOG */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Ajouter une classe"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Nom de la classe"
            placeholder="Ex: BTS SIO 2A"
            {...register("nom")}
            error={errors.nom?.message}
          />

          <Input
            label="Promotion"
            placeholder="Ex: 2024-2025"
            {...register("promotion")}
            error={errors.promotion?.message}
          />

          <Select
            label="Formateur référent (Optionnel)"
            options={[
              { label: "Aucun référent", value: "" },
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
              Créer la classe
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
