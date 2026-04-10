"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  getGradeColor,
  formatPresence,
  getBadgePresenceVariant,
} from "@/lib/utils/grades";
import { Edit2, Plus, MessageSquare, AlertTriangle } from "lucide-react";
import type { User, Note } from "@/types";

interface NoteTableProps {
  eleves: User[];
  notes: Note[];
  onEdit: (eleve: User, note?: Note) => void;
  isLoading?: boolean;
}

export function NoteTable({
  eleves,
  notes,
  onEdit,
  isLoading,
}: NoteTableProps) {
  if (isLoading) {
    return (
      <div className="p-20 text-center bg-white/[0.02] rounded-3xl border border-white/5 animate-pulse">
        <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
          Chargement des élèves...
        </p>
      </div>
    );
  }

  const getNoteForEleve = (eleveId: number) => {
    return notes.find((n) => n.eleveId === eleveId);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Étudiant</TableHeader>
            <TableHeader>État / Présence</TableHeader>
            <TableHeader>Note (/20)</TableHeader>
            <TableHeader>Appréciation</TableHeader>
            <TableHeader className="text-right">Action</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {eleves.map((eleve) => {
            const note = getNoteForEleve(eleve.id);
            const isAbsent = note?.presence && note.presence !== "PRESENT";

            return (
              <TableRow key={eleve.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-primary">
                      {eleve.prenom[0]}
                      {eleve.nom[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase tracking-tight text-xs">
                        {eleve.nom}
                      </p>
                      <p className="text-sm text-slate-400">{eleve.prenom}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {note ? (
                    <div
                      className={`flex items-center gap-2 px-2.5 py-1 rounded-lg w-fit border ${
                        isAbsent
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${isAbsent ? "bg-amber-500" : "bg-emerald-500"}`}
                      />
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        {formatPresence(note.presence)}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-600 bg-white/5 px-2 py-1 rounded-lg border border-white/5 w-fit">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        Non saisie
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {note && !isAbsent ? (
                    <span
                      className={`text-lg font-black ${getGradeColor(note.valeur)}`}
                    >
                      {note.valeur.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-slate-600 font-black">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {note?.commentaire ? (
                    <div className="flex items-start gap-2 max-w-[200px]">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500 mt-1 shrink-0" />
                      <p
                        className="text-sm text-slate-400 italic truncate"
                        title={note.commentaire}
                      >
                        {note.commentaire}
                      </p>
                    </div>
                  ) : (
                    <span className="text-slate-600 text-xs italic">
                      Aucun commentaire
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant={note ? "outline" : "primary"}
                    size="sm"
                    className="rounded-xl font-black uppercase tracking-widest text-[9px] px-3 h-8"
                    onClick={() => onEdit(eleve, note)}
                    leftIcon={
                      note ? (
                        <Edit2 className="w-3 h-3" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )
                    }
                  >
                    {note ? "Modifier" : "Saisir"}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
