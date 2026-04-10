"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import type { UserRole } from "@/types";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter();
  const { isAuthenticated, hasAnyRole } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!hasAnyRole(allowedRoles) && !hasAnyRole(["RP"])) {
      if (hasAnyRole(["RP"])) {
        setIsAuthorized(true);
      } else {
        router.replace("/login");
      }
    } else {
      setIsAuthorized(true);
    }
  }, [isAuthenticated, hasAnyRole, allowedRoles, router]);

  if (!isAuthorized) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
