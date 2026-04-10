"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import {
  useEvaluations,
  useClasseEleves,
  useNotes,
  useCreateNote,
  useUpdateNote,
} from "@/hooks";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Select } from "@/components/ui/Input";
import { NoteTable } from "@/components/notes/NoteTable";
import { NoteForm } from "@/components/notes/NoteForm";
import { FileText, Search, ClipboardList, TrendingUp } from "lucide-react";
import type { User, Note } from "@/types";

export default function NotesEntryPage() {
  const { user } = useAuthStore();
  const [selectedEvaluationId, setSelectedEvaluationId] = useState<string>("");
  const [editingData, setEditingData] = useState<{
    eleve: User;
    note?: Note;
  } | null>(null);

  // Queries
  const { data: evaluations } = useEvaluations({ formateurId: user?.id });

  const selectedEvaluation = evaluations?.content.find(
    (ev) => ev.id === parseInt(selectedEvaluationId),
  );

  const { data: eleves, isLoading: isLoadingEleves } = useClasseEleves(
    selectedEvaluation?.classeId || 0,
  );

  const { data: notes, isLoading: isLoadingNotes } = useNotes({
    evaluationId: selectedEvaluation?.id,
  });

  // Mutations
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();

  const handleEdit = (eleve: User, note?: Note) => {
    setEditingData({ eleve, note });
  };

  const handleSubmitNote = async (data: any) => {
    if (!editingData || !selectedEvaluation) return;

    try {
      if (editingData.note) {
        await updateNoteMutation.mutateAsync({
          id: editingData.note.id,
          data: {
            ...data,
            eleveId: editingData.eleve.id,
            evaluationId: selectedEvaluation.id,
          },
        });
      } else {
        await createNoteMutation.mutateAsync({
          ...data,
          eleveId: editingData.eleve.id,
          evaluationId: selectedEvaluation.id,
        });
      }
      setEditingData(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 uppercase tracking-tighter">
            Saisie des <span className="text-primary">Notes</span>
          </h1>
          <p className="text-slate-400 font-medium">
            Sélectionnez une évaluation pour commencer la saisie des résultats.
          </p>
        </div>
      </div>

      <div className="max-w-md">
        <Select
          label="Évaluation cible"
          options={[
            { label: "Choisir un contrôle...", value: "" },
            ...(evaluations?.content.map((ev) => ({
              label: `${ev.nom} — ${ev.classe?.nom} (${ev.matiere?.nom})`,
              value: ev.id,
            })) || []),
          ]}
          value={selectedEvaluationId}
          onChange={(e) => setSelectedEvaluationId(e.target.value)}
        />
      </div>

      {selectedEvaluation ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                  <ClipboardList className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-0.5">
                    Évaluation
                  </p>
                  <p className="text-lg font-bold text-white uppercase tracking-tight">
                    {selectedEvaluation.nom}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Search className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-0.5">
                    Coefficient
                  </p>
                  <p className="text-lg font-bold text-white">
                    x{selectedEvaluation.coefficient}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <TrendingUp className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-0.5">
                    Date
                  </p>
                  <p className="text-lg font-bold text-white">
                    {new Date(selectedEvaluation.date).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader
              title="Grille de résultats"
              description={`Classe: ${selectedEvaluation.classe?.nom} — Liste des ${eleves?.length || "chargement..."} étudiants.`}
            />
            <CardContent className="p-0">
              <NoteTable
                eleves={eleves || []}
                notes={notes?.content || []}
                onEdit={handleEdit}
                isLoading={isLoadingEleves || isLoadingNotes}
              />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="py-24 text-center bg-[#0a0a0b] rounded-3xl border border-[#1f1f22]">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-5 text-primary" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Veuillez sélectionner une évaluation pour voir la grille de notes.
          </p>
        </div>
      )}

      {editingData && (
        <NoteForm
          isOpen={!!editingData}
          onClose={() => setEditingData(null)}
          onSubmit={handleSubmitNote}
          eleveName={`${editingData.eleve.prenom} ${editingData.eleve.nom}`}
          initialData={
            editingData.note
              ? {
                  valeur: editingData.note.valeur,
                  presence: editingData.note.presence,
                  commentaire: editingData.note.commentaire,
                }
              : undefined
          }
          isSubmitting={
            createNoteMutation.isPending || updateNoteMutation.isPending
          }
        />
      )}
    </div>
  );
}
