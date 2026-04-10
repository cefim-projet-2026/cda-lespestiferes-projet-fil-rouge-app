"use client";

import { useAuthStore } from "@/store/auth";
import { useNotesByEleve } from "@/hooks";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { GradeChart } from "@/components/notes/GradeChart";
import { getGradeColor } from "@/lib/utils/grades";
import { TrendingUp, Award, Clock, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function EleveDashboard() {
  const { user } = useAuthStore();

  const { data: notes, isLoading } = useNotesByEleve(user?.id || 0);

  const average = user?.classe?.moyenneGenerale || 0;
  const nbNotes = notes?.length || 0;

  const lastNote =
    notes && notes.length > 0
      ? [...notes].sort(
          (a, b) =>
            new Date(b.evaluation.date).getTime() -
            new Date(a.evaluation.date).getTime(),
        )[0]
      : null;

  const chartData =
    notes?.map((n) => ({
      date: n.evaluation.date,
      valeur: n.valeur,
      nom: n.evaluation.nom,
    })) || [];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight font-heading text-[var(--on-surface)]">
          Mon <span className="text-primary">Espace</span>
        </h1>
        <p className="text-lg text-[var(--on-surface-variant)] mt-2 font-medium">
          Bonjour{" "}
          <span className="text-[var(--on-surface)] font-bold">
            {user?.prenom}
          </span>
          , voici vos progrès académiques.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card status="primary" className="group">
          <CardContent className="pt-8 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs font-bold uppercase text-[var(--on-surface-variant)] tracking-widest">
                Moyenne Générale
              </p>
            </div>
            <div className="flex items-baseline justify-center sm:justify-start gap-3">
              <p
                className={`text-6xl font-extrabold ${getGradeColor(average)} tracking-tighter`}
              >
                {average.toFixed(2)}
              </p>
              <span className="text-[var(--on-surface-variant)] text-xl font-bold opacity-50">
                / 20
              </span>
            </div>
            <p className="text-sm font-medium text-[var(--on-surface-variant)] mt-4">
              Basé sur vos {nbNotes} évaluations.
            </p>
          </CardContent>
        </Card>

        <Card status="secondary" className="group">
          <CardContent className="pt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#835500]/10 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#835500]" />
              </div>
              <p className="text-xs font-bold uppercase text-[var(--on-surface-variant)] tracking-widest">
                Dernier Résultat
              </p>
            </div>
            {lastNote ? (
              <>
                <div className="flex items-baseline gap-2">
                  <p
                    className={`text-5xl font-extrabold ${getGradeColor(lastNote.valeur)}`}
                  >
                    {lastNote.valeur.toFixed(1)}
                  </p>
                  <span className="text-[var(--on-surface-variant)] text-lg font-bold opacity-50">
                    / 20
                  </span>
                </div>
                <p className="text-sm font-bold text-[var(--on-surface)] uppercase tracking-tight mt-4 truncate">
                  {lastNote.evaluation.nom}
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold text-[var(--on-surface-variant)]">
                Aucune note
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="group">
          <CardContent className="pt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase text-[var(--on-surface-variant)] tracking-widest">
                Activité
              </p>
            </div>
            <p className="text-5xl font-extrabold text-[var(--on-surface)] mb-4">
              {isLoading ? "..." : nbNotes}{" "}
              <span className="text-lg">Notes</span>
            </p>
            <Link
              href="/eleve/notes"
              className="text-sm font-bold text-primary hover:text-primary flex items-center gap-2 hover:translate-x-1 transition-all"
            >
              Consulter le détail <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <GradeChart data={chartData} />
      </div>
    </div>
  );
}
