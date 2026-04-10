"use client";

import { useClasseEleves } from "@/hooks";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/Card";
import { User, Mail, GraduationCap } from "lucide-react";

interface EleveListProps {
  classeId: number;
}

export function EleveList({ classeId }: EleveListProps) {
  const { data: eleves, isLoading } = useClasseEleves(classeId);

  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-500 animate-pulse">
        Chargement des élèves...
      </div>
    );
  }

  if (!eleves || eleves.length === 0) {
    return (
      <div className="p-12 text-center bg-white/[0.02] rounded-2xl border border-white/5">
        <User className="w-10 h-10 mx-auto mb-4 opacity-10" />
        <p className="text-slate-500 font-medium tracking-tight uppercase text-xs">
          Aucun élève dans cette classe
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Élève</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {eleves.map((eleve) => (
            <TableRow key={eleve.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                    {eleve.prenom[0]}
                    {eleve.nom[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase text-xs">
                      {eleve.nom}
                    </p>
                    <p className="text-sm text-slate-400">{eleve.prenom}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono">{eleve.email}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <button className="text-xs font-black uppercase text-primary hover:text-primary tracking-widest transition-colors">
                  Détails
                </button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
