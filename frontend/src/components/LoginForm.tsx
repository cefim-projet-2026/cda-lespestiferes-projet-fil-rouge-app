"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Loader2, GalleryVerticalEndIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/Button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Logo } from "./ui/Logo";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  motDePasse: z.string().min(1, "Mot de passe requis"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      const response = await authApi.login(data);
      if (response.success && response.data) {
        const { user } = response.data;
        setAuth(user);

        document.cookie = `user_role=${user.role}; path=/; max-age=86400; SameSite=Lax`;

        if (user.role === "RP") router.push("/rp/dashboard");
        else if (user.role === "FORMATEUR") router.push("/formateur/dashboard");
        else if (user.role === "ELEVE") router.push("/eleve/dashboard");
      } else {
        setError(response.message || "Identifiants incorrects");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur de connexion au serveur");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-10 items-center justify-center rounded-xl">
                <Logo />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mt-2">
              Campus Connect
            </h1>
            <FieldDescription>
              Connectez-vous pour accéder à votre espace
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Adresse Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="nom@campus.fr"
              {...register("email")}
              className={cn(
                errors.email &&
                  "border-destructive focus-visible:ring-destructive/20",
              )}
            />
            {errors.email && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="motDePasse">Mot de passe</FieldLabel>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>
            <Input
              id="motDePasse"
              type="password"
              placeholder="••••••••"
              {...register("motDePasse")}
              className={cn(
                errors.motDePasse &&
                  "border-destructive focus-visible:ring-destructive/20",
              )}
            />
            {errors.motDePasse && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.motDePasse.message}
              </p>
            )}
          </Field>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium text-center animate-in fade-in zoom-in-95 duration-200">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </FieldGroup>
      </form>

      <p className="px-8 text-center text-sm text-muted-foreground">
        En vous connectant, vous acceptez nos{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Conditions d'Utilisation
        </a>
        .
      </p>
    </div>
  );
}
