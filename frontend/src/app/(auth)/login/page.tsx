"use client";

import { LoginForm } from "@/components/LoginForm";
import { LogoSkolae } from "@/components/ui/Logo";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <LoginForm />
      <div className="absolute bottom-4 right-4 flex items-end gap-2">
        <p className="text-xs text-muted-foreground h-fit">
          Ce service est propulsé par
        </p>
        <LogoSkolae className="h-10 w-auto" />
      </div>
    </div>
  );
}
