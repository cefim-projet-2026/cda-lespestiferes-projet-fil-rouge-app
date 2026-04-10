"use client";

import { useAuthStore } from "@/store/auth";
import { useClasses, useEvaluations } from "@/hooks";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
  GraduationCap,
  ClipboardList,
  Users,
  ArrowRight,
  TrendingUp,
  Presentation,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FormateurDashboard() {
  const { user } = useAuthStore();

  const { data: classes, isLoading: isLoadingClasses } = useClasses({
    formateurId: user?.id,
  });
  const { data: evaluations, isLoading: isLoadingEvs } = useEvaluations({
    formateurId: user?.id,
  });

  const nbClasses = classes?.content.length || 0;
  const nbEvaluations = evaluations?.content.length || 0;
  const totalEleves =
    classes?.content.reduce((acc, c) => acc + (c.nbEleves || 0), 0) || 0;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight font-heading text-[var(--on-surface)]">
          Espace <span className="text-primary">Formateur</span>
        </h1>
        <p className="text-lg text-[var(--on-surface-variant)] mt-2 font-medium">
          Bonjour{" "}
          <span className="text-[var(--on-surface)] font-bold">
            {user?.prenom}
          </span>
          , voici votre activité pédagogique.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card status="primary" className="group">
          <CardContent className="pt-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Presentation className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs font-bold uppercase text-[var(--on-surface-variant)] tracking-widest">
                Mes Classes
              </p>
            </div>
            <p className="text-5xl font-extrabold text-[var(--on-surface)] mb-4">
              {isLoadingClasses ? "..." : nbClasses}
            </p>
            <Link
              href="/formateur/classes"
              className="text-sm font-bold text-primary hover:translate-x-1 transition-transform flex items-center gap-2"
            >
              Gérer mes classes <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>

        <Card status="secondary" className="group">
          <CardContent className="pt-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#835500]/10 rounded-2xl flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-[#835500]" />
              </div>
              <p className="text-xs font-bold uppercase text-[var(--on-surface-variant)] tracking-widest">
                Évaluations
              </p>
            </div>
            <p className="text-5xl font-extrabold text-[var(--on-surface)] mb-4">
              {isLoadingEvs ? "..." : nbEvaluations}
            </p>
            <Link
              href="/formateur/evaluations"
              className="text-sm font-bold text-[#835500] hover:translate-x-1 transition-transform flex items-center gap-2"
            >
              Voir mes contrôles <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="group">
          <CardContent className="pt-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs font-bold uppercase text-[var(--on-surface-variant)] tracking-widest">
                Étudiants
              </p>
            </div>
            <p className="text-5xl font-extrabold text-[var(--on-surface)] mb-4">
              {isLoadingClasses ? "..." : totalEleves}
            </p>
            <p className="text-sm font-medium text-[var(--on-surface-variant)]">
              Répartis sur vos {nbClasses} classes.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader
            title="Prochaines Évaluations"
            description="Vos tests programmés les plus récents."
          />
          <CardContent className="p-0">
            <div className="flex flex-col">
              {evaluations?.content.slice(0, 5).map((ev) => (
                <div
                  key={ev.id}
                  className="px-8 py-4 border-b border-[var(--outline-variant)] flex items-center justify-between hover:bg-[var(--surface-container-low)] transition-colors last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[var(--surface-container-low)] rounded-xl flex items-center justify-center text-[var(--on-surface-variant)]">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[var(--on-surface)] text-sm tracking-tight">
                        {ev.nom}
                      </p>
                      <p className="text-[10px] text-[var(--on-surface-variant)] uppercase font-bold tracking-widest">
                        {ev.classe?.nom}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[var(--on-surface-variant)]">
                    {new Date(ev.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
              {!isLoadingEvs && nbEvaluations === 0 && (
                <div className="p-12 text-center text-[var(--on-surface-variant)] text-sm font-medium">
                  Aucun contrôle au programme.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h3 className="text-xl font-bold font-heading text-[var(--on-surface)] px-2">
            Actions Rapides
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/formateur/notes"
              className="group p-8 bg-[var(--surface-container-low)] rounded-[1.5rem] hover:bg-[var(--surface-container-high)] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary/20 rounded-2xl flex items-center justify-center transition-colors">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-[var(--on-surface)] text-sm uppercase tracking-widest">
                    Saisie des notes
                  </p>
                  <p className="text-sm text-[var(--on-surface-variant)] font-medium">
                    Accéder à la grille de résultats
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-[var(--outline)] group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/formateur/evaluations"
              className="group p-8 bg-[var(--surface-container-low)] rounded-[1.5rem] hover:bg-[var(--surface-container-high)] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#835500]/10 group-hover:bg-[#835500]/20 rounded-2xl flex items-center justify-center transition-colors">
                  <ClipboardList className="w-7 h-7 text-[#835500]" />
                </div>
                <div>
                  <p className="font-bold text-[var(--on-surface)] text-sm uppercase tracking-widest">
                    Programmer
                  </p>
                  <p className="text-sm text-[var(--on-surface-variant)] font-medium">
                    Créer une nouvelle évaluation
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-[var(--outline)] group-hover:text-[#835500] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
