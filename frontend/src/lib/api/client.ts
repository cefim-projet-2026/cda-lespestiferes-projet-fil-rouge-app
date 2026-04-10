import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export const fetchClient = {
  async request(endpoint: string, options: FetchOptions = {}) {
    const { params, headers: customHeaders, ...restOptions } = options;
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    const url = new URL(`${API_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    // Forward the cookies to the backend (e.g. for refresh tokens)
    const allCookies = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const headers = new Headers(customHeaders);
    if (
      !headers.has("Content-Type") &&
      !(restOptions.body instanceof FormData)
    ) {
      headers.set("Content-Type", "application/json");
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (allCookies) {
      headers.set("Cookie", allCookies);
    }

    let response = await fetch(url.toString(), {
      ...restOptions,
      headers,
    });

    // Handle Token refresh logic on 401
    if (response.status === 401 && endpoint !== "/auth/refresh") {
      try {
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: allCookies,
          },
        });

        if (!refreshResponse.ok) {
          throw new Error("Refresh failed");
        }

        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.data?.accessToken;

        if (newAccessToken) {
          // Store new token in HttpOnly cookie
          cookieStore.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 86400, // 24 hours
          });

          // Forward the refresh cookie from backend if present
          const newSetCookie = refreshResponse.headers.get("set-cookie");
          if (newSetCookie) {
            // simplified: Nextjs cookies API would require manual parsing,
            // but if the backend refresh token is maintained, we assume JS doesn't need it or it doesn't rotate on every refresh.
          }

          // Retry the original request
          headers.set("Authorization", `Bearer ${newAccessToken}`);
          response = await fetch(url.toString(), {
            ...restOptions,
            headers,
          });
        } else {
          throw new Error("No new token in refresh response");
        }
      } catch (error) {
        cookieStore.delete("accessToken");
        cookieStore.delete("user_role");
        redirect("/login");
      }
    }

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw { response: { data: errorData, status: response.status } };
    }

    // Parse Response
    const textData = await response.text();
    let data;
    try {
      data = textData ? JSON.parse(textData) : {};
    } catch {
      data = textData;
    }
    return { data, status: response.status, headers: response.headers };
  },

  get(endpoint: string, options?: FetchOptions) {
    return this.request(endpoint, { ...options, method: "GET" });
  },
  post(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
  put(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
  delete(endpoint: string, options?: FetchOptions) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  },
};
