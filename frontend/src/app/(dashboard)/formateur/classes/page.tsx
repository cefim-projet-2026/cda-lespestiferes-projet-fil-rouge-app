"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useClasses } from "@/hooks";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { EleveList } from "@/components/classes/EleveList";
import {
  Search,
  Users,
  ChevronDown,
  ChevronUp,
  GraduationCap,
} from "lucide-react";

export default function FormateurClassesPage() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedClasse, setExpandedClasse] = useState<number | null>(null);

  const { data: classes, isLoading } = useClasses({ formateurId: user?.id });

  const filteredClasses = classes?.content.filter((c) =>
    `${c.nom} ${c.promotion}`.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleClasse = (id: number) => {
    if (expandedClasse === id) {
      setExpandedClasse(null);
    } else {
      setExpandedClasse(id);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 uppercase">
            Mes <span className="text-primary">Classes</span>
          </h1>
          <p className="text-slate-400">
            Gérez vos promotions et accédez aux listes d'élèves.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Rechercher une de vos classes..."
          className="w-full bg-[#0a0a0b] border border-[#1f1f22] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-[#0a0a0b] rounded-2xl border border-[#1f1f22] animate-pulse"
            />
          ))
        ) : filteredClasses?.length === 0 ? (
          <Card className="p-20 text-center text-slate-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p className="text-lg font-medium tracking-tight">
              Vous n'avez aucune classe assignée.
            </p>
          </Card>
        ) : (
          filteredClasses?.map((classe) => (
            <div key={classe.id} className="space-y-4">
              <Card
                className={`transition-all duration-300 border-l-4 ${expandedClasse === classe.id ? "border-l-primary ring-1 ring-primary/10" : "border-l-transparent"}`}
              >
                <div
                  className="p-6 flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleClasse(classe.id)}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl text-primary uppercase">
                      {classe.nom.substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight">
                        {classe.nom}
                      </h3>
                      <p className="text-sm text-slate-400 font-medium">
                        Promo: {classe.promotion}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="hidden md:flex flex-col items-end">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
                        Moyenne Classe
                      </p>
                      <p className="text-lg font-bold text-white">
                        {classe.moyenneGenerale?.toFixed(2) || "0.00"}
                        <span className="text-slate-500 text-xs ml-1">
                          / 20
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                      <Users className="w-4 h-4 text-slate-500 group-hover:text-primary" />
                      <span className="text-sm font-bold text-slate-300 group-hover:text-primary">
                        {classe.nbEleves || 0} Élèves
                      </span>
                    </div>
                    <div className="p-2 rounded-full hover:bg-white/5 transition-colors">
                      {expandedClasse === classe.id ? (
                        <ChevronUp className="w-5 h-5 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedClasse === classe.id && (
                  <div className="border-t border-[#1f1f22] p-6 bg-[#030303]/40 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Composition de la classe
                      </h4>
                    </div>
                    <EleveList classeId={classe.id} />
                  </div>
                )}
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
