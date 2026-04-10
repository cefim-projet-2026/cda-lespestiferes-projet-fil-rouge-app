import { create } from "zustand";
import type { User, UserRole } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  setAuth: (user: User) => void;
  clearAuth: () => void;

  isRP: () => boolean;
  isFormateur: () => boolean;
  isEleve: () => boolean;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,

  setAuth: (user) => set({ user, isAuthenticated: true }),

  clearAuth: () => set({ user: null, isAuthenticated: false }),

  isRP: () => get().user?.role === "RP",
  isFormateur: () => get().user?.role === "FORMATEUR",
  isEleve: () => get().user?.role === "ELEVE",

  hasRole: (role) => get().user?.role === role,

  hasAnyRole: (roles) => {
    const userRole = get().user?.role;
    return userRole ? roles.includes(userRole) : false;
  },
}));
