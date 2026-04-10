"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { RoleGuard } from "@/components/layout/RoleGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["RP", "FORMATEUR", "ELEVE"]}>
      <div className="flex h-screen overflow-hidden bg-[var(--surface)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto w-full p-8 text-[var(--on-surface)] selection:bg-primary/30">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </RoleGuard>
  );
}
