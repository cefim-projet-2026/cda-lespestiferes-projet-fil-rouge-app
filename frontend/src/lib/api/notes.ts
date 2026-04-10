"use server";

import { fetchClient } from "./client";
import { MOCK_NOTES } from "./mockData";
import type {
  Note,
  NoteWithDetails,
  CreateNotePayload,
  UpdateNotePayload,
  ApiResponse,
  PaginatedResponse,
  ImportNoteItem,
  ImportResult,
} from "@/types";

const MOCK_MODE = true;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const notesApi = {
  getAll: async (params?: {
    page?: number;
    size?: number;
    eleveId?: number;
    evaluationId?: number;
  }): Promise<ApiResponse<PaginatedResponse<NoteWithDetails>>> => {
    if (MOCK_MODE) {
      await delay(600);
      let filtered = [...MOCK_NOTES];
      if (params?.eleveId)
        filtered = filtered.filter((n) => n.eleveId === params.eleveId);
      if (params?.evaluationId)
        filtered = filtered.filter(
          (n) => n.evaluationId === params.evaluationId,
        );

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
    const response = await fetchClient.get("/notes", { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<NoteWithDetails>> => {
    if (MOCK_MODE) {
      await delay(400);
      const note = MOCK_NOTES.find((n) => n.id === id);
      if (!note) throw new Error("Not found");
      return { success: true, data: note };
    }
    const response = await fetchClient.get(`/notes/${id}`);
    return response.data;
  },

  getByEleve: async (
    eleveId: number,
  ): Promise<ApiResponse<NoteWithDetails[]>> => {
    if (MOCK_MODE) {
      await delay(500);
      return {
        success: true,
        data: MOCK_NOTES.filter((n) => n.eleveId === eleveId),
      };
    }
    const response = await fetchClient.get(`/notes/eleve/${eleveId}`);
    return response.data;
  },

  create: async (data: CreateNotePayload): Promise<ApiResponse<Note>> => {
    if (MOCK_MODE) {
      await delay(800);
      const newNote: Note = {
        id: Math.floor(Math.random() * 10000),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { success: true, data: newNote };
    }
    const response = await fetchClient.post("/notes", data);
    return response.data;
  },

  update: async (
    id: number,
    data: UpdateNotePayload,
  ): Promise<ApiResponse<Note>> => {
    if (MOCK_MODE) {
      await delay(800);
      const existing = MOCK_NOTES.find((n) => n.id === id);
      if (!existing) throw new Error("Not found");
      return { success: true, data: { ...existing, ...data } as Note };
    }
    const response = await fetchClient.put(`/notes/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    if (MOCK_MODE) {
      await delay(500);
      return { success: true, data: undefined };
    }
    const response = await fetchClient.delete(`/notes/${id}`);
    return response.data;
  },

  importJson: async (
    data: ImportNoteItem[],
  ): Promise<ApiResponse<ImportResult>> => {
    if (MOCK_MODE) {
      await delay(1500);
      return {
        success: true,
        data: {
          total: data.length,
          success: data.length,
          errors: [],
        },
      };
    }
    const response = await fetchClient.post("/notes/import", data);
    return response.data;
  },
};
