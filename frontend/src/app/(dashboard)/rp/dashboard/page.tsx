"use client";

import { useAuthStore } from "@/store/auth";
import { useGlobalStats } from "@/hooks";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
  Users,
  GraduationCap,
  School,
  TrendingUp,
  BookOpen,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock data for the chart
const PerformanceData = [
  { name: "Sept", value: 12.5 },
  { name: "Oct", value: 13.2 },
  { name: "Nov", value: 12.8 },
  { name: "Dec", value: 14.1 },
  { name: "Jan", value: 13.9 },
  { name: "Fev", value: 14.5 },
  { name: "Mar", value: 14.2 },
];

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "primary",
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: string;
  color?: string;
}) {
  return (
    <Card className="relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      <CardContent className="pt-8">
        <div className="flex items-center justify-between mb-6">
          <div
            className={cn(
              "p-3 rounded-2xl transition-colors duration-300",
              color === "primary"
                ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                : "bg-slate-500/10 text-slate-500 group-hover:bg-slate-500/20",
            )}
          >
            <Icon className="size-6" />
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-tighter">
              <ArrowUpRight className="size-3" />
              {trend}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-[0.2em]">
            {title}
          </p>
          <p className="text-4xl font-black text-[var(--on-surface)] tracking-tighter">
            {value}
          </p>
        </div>
      </CardContent>
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
        <Icon className="size-32" />
      </div>
    </Card>
  );
}

export default function RPDashboard() {
  const { user } = useAuthStore();
  const { data: stats, isLoading } = useGlobalStats();

  if (!user) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-10 pb-10">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest bg-primary/5 w-fit px-3 py-1 rounded-full border border-primary/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Système Opérationnel
          </div>
          <h1 className="text-5xl font-black tracking-tight text-[var(--on-surface)]">
            Bonjour, <span className="text-primary">{user.prenom} !</span>
          </h1>
          <p className="text-lg text-[var(--on-surface-variant)] font-medium max-w-2xl leading-relaxed">
            Voici un aperçu des performances et de l'administration de votre
            établissement pour la session{" "}
            <span className="text-[var(--on-surface)] font-bold">
              2025-2026
            </span>
            .
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-2xl border-dashed border-2 px-6 h-12 hover:border-primary/50 transition-all"
          >
            <Clock className="size-4 mr-2 opacity-50" />
            Historique
          </Button>
          <Button className="rounded-2xl shadow-lg shadow-primary/20 px-6 h-12 bg-primary hover:bg-primary/90 transition-all">
            <Plus className="size-4 mr-2" />
            Nouvel Import
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 bg-[var(--surface-container-low)] rounded-[2rem] animate-pulse border border-[var(--outline-variant)]"
            />
          ))
        ) : stats ? (
          <>
            <StatCard
              title="Effectif Total"
              value={stats.nbEleves}
              icon={Users}
              trend="+4.2%"
            />
            <StatCard
              title="Classes Actives"
              value={stats.nbClasses}
              icon={School}
              trend="+12%"
            />
            <StatCard
              title="Equipe Pédagogique"
              value={stats.nbFormateurs}
              icon={GraduationCap}
            />
            <StatCard
              title="Moyenne Générale"
              value={`${stats.moyenneGenerale}/20`}
              icon={TrendingUp}
              trend="+0.4"
            />
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analytics Chart */}
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-ambient ring-1 ring-[var(--outline-variant)]/50">
          <CardHeader
            title="Performance Académique"
            description="Évolution de la moyenne générale sur l'année scolaire en cours."
            action={
              <Select
                className="h-8 py-0 text-xs rounded-lg"
                options={[
                  { label: "Année 2025", value: "2025" },
                  { label: "Année 2024", value: "2024" },
                ]}
              />
            }
          />
          <CardContent className="h-[350px] pt-4 pr-6 pb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={PerformanceData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="8 8"
                  vertical={false}
                  stroke="var(--outline-variant)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--on-surface-variant)",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                  dy={10}
                />
                <YAxis
                  domain={[0, 20]}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--on-surface-variant)",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface-container-high)",
                    borderRadius: "1.5rem",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#F59E0B"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Side Actions / Activity */}
        <div className="space-y-6">
          <Card className="border-none shadow-ambient ring-1 ring-primary/20 bg-primary/[0.02]">
            <CardHeader
              title="Actions Rapides"
              description="Accès direct aux modules."
            />
            <CardContent className="space-y-3">
              {[
                { label: "Créer une classe", icon: Plus, href: "/rp/classes" },
                {
                  label: "Gérer les matières",
                  icon: BookOpen,
                  href: "/rp/matieres",
                },
                {
                  label: "Liste utilisateurs",
                  icon: Users,
                  href: "/rp/utilisateurs",
                },
              ].map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-white/80 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <action.icon className="size-4" />
                    </div>
                    <span className="text-sm font-bold text-[var(--on-surface)]">
                      {action.label}
                    </span>
                  </div>
                  <ArrowRight className="size-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-ambient ring-1 ring-[var(--outline-variant)]/50">
            <CardHeader title="Dernière Activité" />
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    text: "Imports JSON complétés",
                    time: "Il y a 2h",
                    icon: CheckCircle2,
                    color: "text-green-500",
                  },
                  {
                    text: "Nouvelle classe : BTS SIO",
                    time: "Il y a 5h",
                    icon: School,
                    color: "text-blue-500",
                  },
                  {
                    text: "Matière assignée : Java",
                    time: "Hier",
                    icon: BookOpen,
                    color: "text-amber-500",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div
                      className={cn(
                        "mt-1 p-1 rounded-full bg-slate-100 group-hover:scale-110 transition-transform",
                        item.color,
                      )}
                    >
                      <item.icon className="size-3" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--on-surface)] leading-none">
                        {item.text}
                      </p>
                      <p className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-tight mt-1 opacity-60">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
