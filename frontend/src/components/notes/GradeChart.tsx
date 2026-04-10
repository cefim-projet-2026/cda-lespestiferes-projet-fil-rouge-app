"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";

interface GradeChartProps {
  data: { date: string; valeur: number; nom: string }[];
}

export function GradeChart({ data }: GradeChartProps) {
  // Sort data by date
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Format date for display
  const chartData = sortedData.map((d) => ({
    ...d,
    formattedDate: new Date(d.date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    }),
  }));

  return (
    <Card className="h-[450px] flex flex-col">
      <CardHeader
        title="Évolution des résultats"
        description="Courbe de performance sur l'ensemble des évaluations."
      />
      <CardContent className="flex-1 pb-8 pr-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="primary" stopOpacity={0.2} />
                <stop offset="95%" stopColor="primary" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="6 6"
              vertical={false}
              stroke="var(--outline-variant)"
              opacity={0.6}
            />
            <XAxis
              dataKey="formattedDate"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--on-surface-variant)",
                fontSize: 10,
                fontWeight: 700,
              }}
              dy={15}
            />
            <YAxis
              domain={[0, 20]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--on-surface-variant)",
                fontSize: 10,
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
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[var(--surface-container-high)] p-4 rounded-[1.5rem] shadow-ambient border-none">
                      <p className="text-[10px] font-bold uppercase text-[var(--on-surface-variant)] tracking-widest mb-2">
                        {payload[0].payload.formattedDate}
                      </p>
                      <p className="text-sm font-bold text-[var(--on-surface)] mb-1">
                        {payload[0].payload.nom}
                      </p>
                      <p className="text-2xl font-extrabold text-primary tracking-tight">
                        {payload[0].value}{" "}
                        <span className="text-[var(--on-surface-variant)] text-xs font-bold opacity-50">
                          / 20
                        </span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="valeur"
              stroke="primary"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorGrade)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
