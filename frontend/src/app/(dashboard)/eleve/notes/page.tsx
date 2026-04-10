"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useNotesByEleve, useMatieres } from "@/hooks";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/Card";
import { getGradeColor, formatPresence } from "@/lib/utils/grades";
import {
  Search,
  Filter,
  BookOpen,
  Calendar,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

export default function EleveNotesPage() {
  const { user } = useAuthStore();
  const [selectedMatiere, setSelectedMatiere] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: notes, isLoading: isLoadingNotes } = useNotesByEleve(
    user?.id || 0,
  );
  const { data: matieres } = useMatieres();

  const filteredNotes = notes?.filter((n) => {
    const matchesMatiere =
      selectedMatiere === "ALL" ||
      n.evaluation.matiereId === parseInt(selectedMatiere);
    const matchesSearch = n.evaluation.nom
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesMatiere && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 uppercase">
            Mes <span className="text-primary">Résultats</span>
          </h1>
          <p className="text-slate-400 font-medium">
            Historique complet de vos notes et évaluations par matière.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader
          title="Consulter mes notes"
          description="Retrouvez le détail de chaque évaluation passé."
          action={
            <div className="flex items-center gap-3">
              <div className="relative w-64 ring-primary/50">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Rechercher un contrôle..."
                  className="w-full bg-[#030303]/60 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative flex items-center bg-[#030303]/60 border border-white/10 rounded-xl px-3 transition-all hover:border-primary/30">
                <Filter className="w-4 h-4 text-slate-500 mr-2" />
                <select
                  className="bg-transparent py-2 text-sm text-white focus:outline-none cursor-pointer pr-4 font-bold"
                  value={selectedMatiere}
                  onChange={(e) => setSelectedMatiere(e.target.value)}
                >
                  <option value="ALL">Toutes les matières</option>
                  {matieres?.content.map((m) => (
                    <option key={m.id} value={m.id} className="bg-[#0a0a0b]">
                      {m.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          }
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Évaluation</TableHeader>
              <TableHeader>Matière</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Note (/20)</TableHeader>
              <TableHeader>Appréciation</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {isLoadingNotes ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center animate-pulse text-slate-600"
                  >
                    Chargement de votre relevé...
                  </TableCell>
                </TableRow>
              ))
            ) : filteredNotes?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-20 text-center text-slate-500"
                >
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-5 text-primary" />
                  <p className="font-black uppercase tracking-tight text-xs">
                    Aucun résultat trouvé pour cette sélection.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filteredNotes?.map((n) => (
                <TableRow key={n.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-bold text-white uppercase tracking-tight">
                        {n.evaluation.nom}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-black uppercase text-slate-500 tracking-wider bg-white/5 px-2 py-0.5 border border-white/5 rounded">
                      {n.evaluation.matiere?.nom || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-xs font-mono">
                        {new Date(n.evaluation.date).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {n.presence === "PRESENT" ? (
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-xl font-black ${getGradeColor(n.valeur)}`}
                        >
                          {n.valeur.toFixed(1)}
                        </span>
                        <span className="text-[10px] text-slate-600 font-bold">
                          / 20
                        </span>
                      </div>
                    ) : (
                      <div className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg text-[10px] font-black uppercase inline-block">
                        {formatPresence(n.presence)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {n.commentaire ? (
                      <div className="flex items-start gap-2 max-w-[240px]">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500 mt-1 shrink-0" />
                        <p
                          className="text-sm text-slate-400 italic"
                          title={n.commentaire}
                        >
                          {n.commentaire}
                        </p>
                      </div>
                    ) : (
                      <span className="text-slate-600 text-xs italic tracking-tight">
                        Aucun commentaire formateur
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <BookOpen className="w-16 h-16 text-primary" />
          </div>
          <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-4">
            Informations importantes
          </h4>
          <ul className="space-y-4 text-sm text-slate-400 font-medium tracking-tight">
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              Les moyennes sont calculées automatiquement par le système.
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              Une absence justifiée n'impacte pas votre moyenne générale.
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              Pensez à consulter régulièrement vos appréciations.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
