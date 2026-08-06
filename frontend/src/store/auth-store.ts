// ===========================================
// MOIRA — Auth Store (Zustand)
// ===========================================

import { create } from "zustand";
import Cookies from "js-cookie";
import api from "@/lib/api";
import type { User, AuthResponse, LoginPayload, RegisterPayload } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: !!Cookies.get("movemind_token"),
  isLoading: false,
  error: null,

  login: async (payload: LoginPayload) => {
    set({ isLoading: true, error: null });

    // ==========================================
    // DEMO MODE BYPASS (No backend required)
    // ==========================================
    const email = payload.email.toLowerCase();
    
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const dummyUser: User = {
      id: "demo-123",
      email: payload.email,
      firstName: "Demo",
      lastName: "User",
      role: "ADMIN",
      avatarUrl: null,
      phone: null,
      isActive: true,
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    Cookies.set("movemind_token", "dummy_token", { expires: 7 });
    set({ user: dummyUser, isAuthenticated: true, isLoading: false, error: null });
    return;
    // ==========================================

    try {
      const { data } = await api.post<{ success: boolean; data: AuthResponse }>(
        "/auth/login",
        payload
      );

      const { user, accessToken, refreshToken } = data.data;

      Cookies.set("movemind_token", accessToken, { expires: 7 });
      Cookies.set("movemind_refresh_token", refreshToken, { expires: 30 });

      set({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Login failed. Please try again.";
      set({ isLoading: false, error: message });
      throw new Error(message);
    }
  },

  register: async (payload: RegisterPayload) => {
    set({ isLoading: true, error: null });
    
    // DEMO MODE BYPASS
    const email = payload.email.toLowerCase();
    if (email.includes("demo") || email.includes("admin")) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const dummyUser: User = {
        id: "demo-123",
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        role: "ADMIN",
        avatarUrl: null,
        phone: null,
        isActive: true,
        lastLoginAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      Cookies.set("movemind_token", "dummy_token", { expires: 7 });
      set({ user: dummyUser, isAuthenticated: true, isLoading: false, error: null });
      return;
    }

    try {
      const { data } = await api.post<{ success: boolean; data: AuthResponse }>(
        "/auth/register",
        payload
      );

      const { user, accessToken, refreshToken } = data.data;

      Cookies.set("movemind_token", accessToken, { expires: 7 });
      Cookies.set("movemind_refresh_token", refreshToken, { expires: 30 });

      set({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Registration failed. Please try again.";

      // Handle validation errors
      if (error.response?.data?.details) {
        const details = error.response.data.details as Array<{
          field: string;
          message: string;
        }>;
        const fieldErrors = details.map((d) => d.message).join(". ");
        set({ isLoading: false, error: fieldErrors });
        throw new Error(fieldErrors);
      }

      set({ isLoading: false, error: message });
      throw new Error(message);
    }
  },

  logout: async () => {
    try {
      const refreshToken = Cookies.get("movemind_refresh_token");
      if (refreshToken && Cookies.get("movemind_token") !== "dummy_token") {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch {
      // Silently fail — we still want to clear local state
    } finally {
      Cookies.remove("movemind_token");
      Cookies.remove("movemind_refresh_token");
      set({ user: null, isAuthenticated: false, error: null });
    }
  },

  fetchUser: async () => {
    const token = Cookies.get("movemind_token");
    if (!token) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    set({ isLoading: true });

    // DEMO MODE BYPASS
    if (token === "dummy_token") {
      const dummyUser: User = {
        id: "demo-123",
        email: "demo@moira.ai",
        firstName: "Demo",
        lastName: "Admin",
        role: "ADMIN",
        avatarUrl: null,
        phone: null,
        isActive: true,
        lastLoginAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      set({ user: dummyUser, isAuthenticated: true, isLoading: false });
      return;
    }

    try {
      const { data } = await api.get<{
        success: boolean;
        data: { user: User };
      }>("/auth/me");

      set({
        user: data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      Cookies.remove("movemind_token");
      Cookies.remove("movemind_refresh_token");
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),

  setUser: (user: User) => set({ user }),
}));
