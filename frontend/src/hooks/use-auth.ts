// ===========================================
// MOIRA — useAuth Hook
// ===========================================

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

/**
 * Auth convenience hook.
 * If `requireAuth` is true, redirects to /login when unauthenticated.
 * If `redirectIfAuth` is set, redirects authenticated users away (e.g. from login page).
 */
export function useAuth(options?: {
  requireAuth?: boolean;
  redirectIfAuth?: string;
}) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    if (!user && isAuthenticated) {
      fetchUser();
    }
  }, [user, isAuthenticated, fetchUser]);

  useEffect(() => {
    if (isLoading) return;

    if (options?.requireAuth && !isAuthenticated) {
      router.push("/login");
    }

    if (options?.redirectIfAuth && isAuthenticated) {
      router.push(options.redirectIfAuth);
    }
  }, [isAuthenticated, isLoading, options, router]);

  return useAuthStore();
}
