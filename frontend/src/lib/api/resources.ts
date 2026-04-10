"use server";

import { fetchClient } from "./client";
import {
  MOCK_CLASSES,
  MOCK_MATIERES,
  MOCK_EVALUATIONS,
  MOCK_USERS,
  MOCK_STATS,
} from "./mockData";
import type {
  Classe,
  Matiere,
  Evaluation,
  User,
  ApiResponse,
  PaginatedResponse,
  CreateClassePayload,
  CreateMatierePayload,
  CreateEvaluationPayload,
  CreateUserPayload,
  GlobalStats,
} from "@/types";

const MOCK_MODE = true;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const classesApi = {
  getAll: async (params?: {
    page?: number;
    size?: number;
    formateurId?: number;
  }): Promise<ApiResponse<PaginatedResponse<Classe>>> => {
    if (MOCK_MODE) {
      await delay(600);
      let filtered = [...MOCK_CLASSES];
      if (params?.formateurId)
        filtered = filtered.filter((c) => c.formateurId === params.formateurId);
      return {
        success: true,
        data: {
          content: filtered,
          totalElements: filtered.length,
          totalPages: 1,
          page: 0,
          size: 20,
        },
      };
    }
    const response = await fetchClient.get("/classes", { params });
    return response.data;
  },
  getById: async (id: number): Promise<ApiResponse<Classe>> => {
    if (MOCK_MODE) {
      await delay(400);
      const item = MOCK_CLASSES.find((c) => c.id === id);
      if (!item) throw new Error("Not found");
      return { success: true, data: item };
    }
    const response = await fetchClient.get(`/classes/${id}`);
    return response.data;
  },
  getEleves: async (classeId: number): Promise<ApiResponse<User[]>> => {
    if (MOCK_MODE) {
      await delay(500);
      return {
        success: true,
        data: MOCK_USERS.filter(
          (u) => u.role === "ELEVE" && u.classeId === classeId,
        ),
      };
    }
    const response = await fetchClient.get(`/classes/${classeId}/eleves`);
    return response.data;
  },
  create: async (data: CreateClassePayload): Promise<ApiResponse<Classe>> => {
    if (MOCK_MODE) {
      await delay(800);
      const newItem: Classe = {
        id: Math.floor(Math.random() * 1000),
        ...data,
        nbEleves: 0,
        moyenneGenerale: 0,
      };
      return { success: true, data: newItem };
    }
    const response = await fetchClient.post("/classes", data);
    return response.data;
  },
  update: async (
    id: number,
    data: Partial<CreateClassePayload>,
  ): Promise<ApiResponse<Classe>> => {
    if (MOCK_MODE) {
      await delay(800);
      const existing = MOCK_CLASSES.find((c) => c.id === id);
      if (!existing) throw new Error("Not found");
      return { success: true, data: { ...existing, ...data } as Classe };
    }
    const response = await fetchClient.put(`/classes/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<ApiResponse<void>> => {
    if (MOCK_MODE) {
      await delay(500);
      return { success: true, data: undefined };
    }
    const response = await fetchClient.delete(`/classes/${id}`);
    return response.data;
  },
};

export const matieresApi = {
  getAll: async (params?: {
    page?: number;
    size?: number;
  }): Promise<ApiResponse<PaginatedResponse<Matiere>>> => {
    if (MOCK_MODE) {
      await delay(600);
      return {
        success: true,
        data: {
          content: MOCK_MATIERES,
          totalElements: MOCK_MATIERES.length,
          totalPages: 1,
          page: 0,
          size: 20,
        },
      };
    }
    const response = await fetchClient.get("/matieres", { params });
    return response.data;
  },
  getById: async (id: number): Promise<ApiResponse<Matiere>> => {
    if (MOCK_MODE) {
      await delay(400);
      const item = MOCK_MATIERES.find((m) => m.id === id);
      if (!item) throw new Error("Not found");
      return { success: true, data: item };
    }
    const response = await fetchClient.get(`/matieres/${id}`);
    return response.data;
  },
  create: async (data: CreateMatierePayload): Promise<ApiResponse<Matiere>> => {
    if (MOCK_MODE) {
      await delay(800);
      const newItem: Matiere = {
        id: Math.floor(Math.random() * 1000),
        ...data,
      };
      return { success: true, data: newItem };
    }
    const response = await fetchClient.post("/matieres", data);
    return response.data;
  },
  update: async (
    id: number,
    data: Partial<CreateMatierePayload>,
  ): Promise<ApiResponse<Matiere>> => {
    if (MOCK_MODE) {
      await delay(800);
      const existing = MOCK_MATIERES.find((m) => m.id === id);
      if (!existing) throw new Error("Not found");
      return { success: true, data: { ...existing, ...data } as Matiere };
    }
    const response = await fetchClient.put(`/matieres/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<ApiResponse<void>> => {
    if (MOCK_MODE) {
      await delay(500);
      return { success: true, data: undefined };
    }
    const response = await fetchClient.delete(`/matieres/${id}`);
    return response.data;
  },
};

export const evaluationsApi = {
  getAll: async (params?: {
    page?: number;
    size?: number;
    classeId?: number;
  }): Promise<ApiResponse<PaginatedResponse<Evaluation>>> => {
    if (MOCK_MODE) {
      await delay(600);
      let filtered = [...MOCK_EVALUATIONS];
      if (params?.classeId)
        filtered = filtered.filter((ev) => ev.classeId === params.classeId);
      return {
        success: true,
        data: {
          content: filtered,
          totalElements: filtered.length,
          totalPages: 1,
          page: 0,
          size: 20,
        },
      };
    }
    const response = await fetchClient.get("/evaluations", { params });
    return response.data;
  },
  getById: async (id: number): Promise<ApiResponse<Evaluation>> => {
    if (MOCK_MODE) {
      await delay(400);
      const item = MOCK_EVALUATIONS.find((ev) => ev.id === id);
      if (!item) throw new Error("Not found");
      return { success: true, data: item };
    }
    const response = await fetchClient.get(`/evaluations/${id}`);
    return response.data;
  },
  create: async (
    data: CreateEvaluationPayload,
  ): Promise<ApiResponse<Evaluation>> => {
    if (MOCK_MODE) {
      await delay(800);
      const newItem: Evaluation = {
        id: Math.floor(Math.random() * 1000),
        ...data,
      };
      return { success: true, data: newItem };
    }
    const response = await fetchClient.post("/evaluations", data);
    return response.data;
  },
  update: async (
    id: number,
    data: Partial<CreateEvaluationPayload>,
  ): Promise<ApiResponse<Evaluation>> => {
    if (MOCK_MODE) {
      await delay(800);
      const existing = MOCK_EVALUATIONS.find((ev) => ev.id === id);
      if (!existing) throw new Error("Not found");
      return { success: true, data: { ...existing, ...data } as Evaluation };
    }
    const response = await fetchClient.put(`/evaluations/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<ApiResponse<void>> => {
    if (MOCK_MODE) {
      await delay(500);
      return { success: true, data: undefined };
    }
    const response = await fetchClient.delete(`/evaluations/${id}`);
    return response.data;
  },
};

export const utilisateursApi = {
  getAll: async (params?: {
    page?: number;
    size?: number;
    role?: string;
  }): Promise<ApiResponse<PaginatedResponse<User>>> => {
    if (MOCK_MODE) {
      await delay(600);
      let filtered = [...MOCK_USERS];
      if (params?.role)
        filtered = filtered.filter((u) => u.role === params.role);
      return {
        success: true,
        data: {
          content: filtered,
          totalElements: filtered.length,
          totalPages: 1,
          page: 0,
          size: 20,
        },
      };
    }
    const response = await fetchClient.get("/utilisateurs", { params });
    return response.data;
  },
  getById: async (id: number): Promise<ApiResponse<User>> => {
    if (MOCK_MODE) {
      await delay(400);
      const item = MOCK_USERS.find((u) => u.id === id);
      if (!item) throw new Error("Not found");
      return { success: true, data: item };
    }
    const response = await fetchClient.get(`/utilisateurs/${id}`);
    return response.data;
  },
  create: async (data: CreateUserPayload): Promise<ApiResponse<User>> => {
    if (MOCK_MODE) {
      await delay(800);
      const newItem: User = { id: Math.floor(Math.random() * 1000), ...data };
      return { success: true, data: newItem };
    }
    const response = await fetchClient.post("/utilisateurs", data);
    return response.data;
  },
  update: async (
    id: number,
    data: Partial<CreateUserPayload>,
  ): Promise<ApiResponse<User>> => {
    if (MOCK_MODE) {
      await delay(800);
      const existing = MOCK_USERS.find((u) => u.id === id);
      if (!existing) throw new Error("Not found");
      return { success: true, data: { ...existing, ...data } as User };
    }
    const response = await fetchClient.put(`/utilisateurs/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<ApiResponse<void>> => {
    if (MOCK_MODE) {
      await delay(500);
      return { success: true, data: undefined };
    }
    const response = await fetchClient.delete(`/utilisateurs/${id}`);
    return response.data;
  },
};

export const statsApi = {
  getGlobalStats: async (): Promise<ApiResponse<GlobalStats>> => {
    if (MOCK_MODE) {
      await delay(700);
      return { success: true, data: MOCK_STATS };
    }
    const response = await fetchClient.get("/stats/global");
    return response.data;
  },
};
