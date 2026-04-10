"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import {
  classesApi,
  matieresApi,
  evaluationsApi,
  utilisateursApi,
  statsApi,
} from "@/lib/api/resources";
import { notesApi } from "@/lib/api/notes";
import type {
  CreateUserPayload,
  CreateClassePayload,
  CreateMatierePayload,
  CreateEvaluationPayload,
  CreateNotePayload,
  UpdateNotePayload,
  ImportNoteItem,
} from "@/types";

// Query Keys
export const QK = {
  auth: {
    me: () => ["auth", "me"],
  },
  stats: {
    global: () => ["stats", "global"],
  },
  utilisateurs: {
    all: (params?: any) => ["utilisateurs", "all", params || {}],
    detail: (id: number) => ["utilisateurs", id],
  },
  classes: {
    all: (params?: any) => ["classes", "all", params || {}],
    detail: (id: number) => ["classes", id],
    eleves: (id: number) => ["classes", id, "eleves"],
  },
  matieres: {
    all: (params?: any) => ["matieres", "all", params || {}],
    detail: (id: number) => ["matieres", id],
  },
  evaluations: {
    all: (params?: any) => ["evaluations", "all", params || {}],
    detail: (id: number) => ["evaluations", id],
  },
  notes: {
    all: (params?: any) => ["notes", "all", params || {}],
    byEleve: (id: number) => ["notes", "eleve", id],
    detail: (id: number) => ["notes", id],
  },
};

// ─── AUTH HOOKS ─────────────────────────────────────────────────────────────

export const useMe = () => {
  return useQuery({
    queryKey: QK.auth.me(),
    queryFn: () => authApi.me().then((res) => res.data),
    staleTime: Infinity,
  });
};

// ─── STATS HOOKS ────────────────────────────────────────────────────────────

export const useGlobalStats = () => {
  return useQuery({
    queryKey: QK.stats.global(),
    queryFn: () => statsApi.getGlobalStats().then((res) => res.data),
  });
};

// ─── UTILISATEURS HOOKS ──────────────────────────────────────────────────────

export const useUtilisateurs = (params?: any) => {
  return useQuery({
    queryKey: QK.utilisateurs.all(params),
    queryFn: () => utilisateursApi.getAll(params).then((res) => res.data),
  });
};

export const useCreateUtilisateur = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserPayload) => utilisateursApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.utilisateurs.all() }),
  });
};

export const useUpdateUtilisateur = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateUserPayload>;
    }) => utilisateursApi.update(id, data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: QK.utilisateurs.all() });
      qc.invalidateQueries({ queryKey: QK.utilisateurs.detail(variables.id) });
    },
  });
};

export const useDeleteUtilisateur = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => utilisateursApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.utilisateurs.all() }),
  });
};

// ─── CLASSES HOOKS ───────────────────────────────────────────────────────────

export const useClasses = (params?: any) => {
  return useQuery({
    queryKey: QK.classes.all(params),
    queryFn: () => classesApi.getAll(params).then((res) => res.data),
  });
};

export const useClasseEleves = (id: number) => {
  return useQuery({
    queryKey: QK.classes.eleves(id),
    queryFn: () => classesApi.getEleves(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateClasse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateClassePayload) => classesApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.classes.all() }),
  });
};

// ─── MATIERES HOOKS ──────────────────────────────────────────────────────────

export const useMatieres = (params?: any) => {
  return useQuery({
    queryKey: QK.matieres.all(params),
    queryFn: () => matieresApi.getAll(params).then((res) => res.data),
  });
};

export const useCreateMatiere = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMatierePayload) => matieresApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.matieres.all() }),
  });
};

// ─── EVALUATIONS HOOKS ───────────────────────────────────────────────────────

export const useEvaluations = (params?: any) => {
  return useQuery({
    queryKey: QK.evaluations.all(params),
    queryFn: () => evaluationsApi.getAll(params).then((res) => res.data),
  });
};

export const useCreateEvaluation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEvaluationPayload) => evaluationsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.evaluations.all() }),
  });
};

// ─── NOTES HOOKS ─────────────────────────────────────────────────────────────

export const useNotes = (params?: any) => {
  return useQuery({
    queryKey: QK.notes.all(params),
    queryFn: () => notesApi.getAll(params).then((res) => res.data),
  });
};

export const useNotesByEleve = (id: number) => {
  return useQuery({
    queryKey: QK.notes.byEleve(id),
    queryFn: () => notesApi.getByEleve(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateNotePayload) => notesApi.create(data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: QK.notes.all() });
      qc.invalidateQueries({ queryKey: QK.notes.byEleve(variables.eleveId) });
    },
  });
};

export const useUpdateNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNotePayload }) =>
      notesApi.update(id, data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: QK.notes.all() });
      if (variables.data.eleveId) {
        qc.invalidateQueries({
          queryKey: QK.notes.byEleve(variables.data.eleveId),
        });
      }
    },
  });
};

export const useImportNotes = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ImportNoteItem[]) => notesApi.importJson(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QK.notes.all() });
      qc.invalidateQueries({ queryKey: QK.stats.global() });
    },
  });
};
