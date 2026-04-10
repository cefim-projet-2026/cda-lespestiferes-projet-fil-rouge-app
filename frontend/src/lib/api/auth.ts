"use server";

import { fetchClient } from "./client";
import { MOCK_USERS } from "./mockData";
import { cookies } from "next/headers";
import type {
  LoginPayload,
  ApiResponse,
  AuthTokens,
  User,
  ChangePasswordPayload,
} from "@/types";

const MOCK_MODE = true;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  login: async (
    data: LoginPayload,
  ): Promise<ApiResponse<{ user: User; tokens?: AuthTokens }>> => {
    if (MOCK_MODE) {
      await delay(800);
      const found = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === data.email.toLowerCase(),
      );
      const user = found ?? MOCK_USERS[0];

      cookies().set("accessToken", "mock-jwt-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 3600,
      });

      return {
        success: true,
        data: {
          user,
        },
      };
    }

    // Using custom fetch implementation
    const response = await fetchClient.post("/auth/login", data);
    const { user, tokens } = response.data.data;

    if (response.data.success && tokens?.accessToken) {
      cookies().set("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: tokens.expiresIn || 3600,
      });
    }

    // We do not return tokens to the client
    return {
      ...response.data,
      data: { user },
    };
  },

  logout: async (): Promise<ApiResponse<void>> => {
    if (MOCK_MODE) {
      await delay(300);
      cookies().delete("accessToken");
      cookies().delete("user_role");
      return { success: true, data: undefined };
    }
    const response = await fetchClient.post("/auth/logout");
    cookies().delete("accessToken");
    cookies().delete("user_role");
    return response.data;
  },

  me: async (): Promise<ApiResponse<User>> => {
    if (MOCK_MODE) {
      await delay(500);
      return { success: true, data: MOCK_USERS[0] };
    }
    const response = await fetchClient.get("/auth/me");
    return response.data;
  },

  changePassword: async (
    data: ChangePasswordPayload,
  ): Promise<ApiResponse<void>> => {
    if (MOCK_MODE) {
      await delay(1000);
      return {
        success: true,
        data: undefined,
        message: "Mot de passe modifié (MOCK)",
      };
    }
    const response = await fetchClient.post("/auth/change-password", data);
    return response.data;
  },
};
