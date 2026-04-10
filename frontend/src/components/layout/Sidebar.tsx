"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import {
  Users,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  FileSpreadsheet,
  FileUp,
  Settings,
  LogOut,
  FileText,
  User,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { user, isRP, isFormateur, isEleve, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.error("Erreur lors de la déconnexion", e);
    } finally {
      clearAuth();
      router.push("/login");
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const menuItems = {
    rp: [
      { name: "Dashboard", href: "/rp/dashboard", icon: LayoutDashboard },
      { name: "Utilisateurs", href: "/rp/utilisateurs", icon: Users },
      { name: "Classes", href: "/rp/classes", icon: BookOpen },
      { name: "Matières", href: "/rp/matieres", icon: GraduationCap },
      { name: "Imports JSON", href: "/rp/imports", icon: FileUp },
    ],
    formateur: [
      {
        name: "Dashboard",
        href: "/formateur/dashboard",
        icon: LayoutDashboard,
      },
      { name: "Mes Classes", href: "/formateur/classes", icon: BookOpen },
      {
        name: "Évaluations",
        href: "/formateur/evaluations",
        icon: FileSpreadsheet,
      },
      { name: "Saisie Notes", href: "/formateur/notes", icon: FileText },
    ],
    eleve: [
      { name: "Dashboard", href: "/eleve/dashboard", icon: LayoutDashboard },
      { name: "Mes Notes", href: "/eleve/notes", icon: FileSpreadsheet },
      { name: "Mon Profil", href: "/eleve/profil", icon: Settings },
    ],
  };

  let links: any[] = [];
  if (isRP()) links = menuItems.rp;
  else if (isFormateur()) links = menuItems.formateur;
  else if (isEleve()) links = menuItems.eleve;

  if (!user) return null;

  return (
    <aside className="w-72 bg-[var(--sidebar)] text-[var(--sidebar-foreground)] flex flex-col min-h-screen border-r border-[var(--sidebar-border)] shadow-sm">
      {/* Header Section */}
      <div className="p-8 pb-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-2xl">
            <Logo className="h-8 w-auto text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight leading-none text-[var(--on-surface)]">
              Campus{" "}
              <span className="text-primary tracking-tighter">Connect</span>
            </h1>
            <p className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mt-1">
              Digital Atrium
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4 space-y-1.5 mt-6 scrollbar-hide overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "group relative flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 ease-out",
                isActive
                  ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(245,158,11,0.1)]"
                  : "text-[var(--on-surface-variant)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] hover:translate-x-1",
              )}
            >
              {isActive && (
                <div className="absolute left-0 w-1.5 h-6 bg-primary rounded-r-full shadow-[0_0_12px_rgba(245,158,11,0.4)]" />
              )}
              <Icon
                className={cn(
                  "mr-3 shrink-0 h-5 w-5 transition-all duration-300",
                  isActive
                    ? "text-primary scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                    : "text-[var(--on-surface-variant)] group-hover:text-[var(--on-surface)] group-hover:scale-110",
                )}
                aria-hidden="true"
              />
              <span className="transition-transform duration-300">
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section: User Profile & Actions */}
      <div className="p-4 mt-auto border-t border-[var(--sidebar-border)] bg-[var(--sidebar-accent)]/20">
        <div className="bg-[var(--sidebar-accent)] rounded-3xl p-4 shadow-sm border border-[var(--sidebar-border)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-md">
              {getInitials(user.prenom, user.nom)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[var(--on-surface)] leading-tight">
                {user.prenom} {user.nom}
              </p>
              <p className="truncate text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mt-0.5">
                {user.role}
              </p>
            </div>
            <Link
              href={isEleve() ? "/eleve/profil" : "#"}
              className="p-1.5 hover:bg-primary/10 rounded-lg text-[var(--on-surface-variant)] hover:text-primary transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--sidebar-border)]/50">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center justify-center gap-2 px-3 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut className="shrink-0 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
