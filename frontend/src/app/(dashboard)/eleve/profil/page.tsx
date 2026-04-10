"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";
import { authApi } from "@/lib/api/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
  User,
  Shield,
  Lock,
  ShieldCheck,
  Mail,
  GraduationCap,
} from "lucide-react";

const passwordSchema = z
  .object({
    ancienMotDePasse: z.string().min(1, "Ancien mot de passe requis"),
    nouveauMotDePasse: z.string().min(6, "6 caractères minimum"),
    confirmationMotDePasse: z.string().min(6, "6 caractères minimum"),
  })
  .refine((data) => data.nouveauMotDePasse === data.confirmationMotDePasse, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmationMotDePasse"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfilPage() {
  const { user } = useAuthStore();
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      setStatus(null);
      await authApi.changePassword(data);
      setStatus({
        type: "success",
        message: "Mot de passe mis à jour avec succès.",
      });
      reset();
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Une erreur est survenue.",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
          Mon <span className="text-primary">Profil</span>
        </h1>
        <p className="text-slate-400 font-medium tracking-tight">
          Gérez vos informations personnelles et la sécurité de votre compte.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="p-8 text-center bg-primary/5 border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-16 h-16 text-primary" />
            </div>
            <div className="w-24 h-24 rounded-3xl bg-primary shadow-2xl shadow-primary/20 mx-auto mb-6 flex items-center justify-center font-black text-3xl text-white outline outline-4 outline-white/5">
              {user.prenom[0]}
              {user.nom[0]}
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">
              {user.prenom} {user.nom}
            </h3>
            <span className="mt-2 inline-block px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-black uppercase tracking-widest text-primary">
              {user.role}
            </span>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a0b] border border-[#1f1f22]">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-0.5">
                  Contact
                </p>
                <p className="text-sm font-bold text-slate-300 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a0b] border border-[#1f1f22]">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-0.5">
                  Établissement
                </p>
                <p className="text-sm font-bold text-slate-300">
                  {user.classe?.nom || "Campus Académie"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader
              title="Sécurité du compte"
              description="Modifiez votre mot de passe pour protéger votre accès."
            />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Ancien mot de passe"
                  type="password"
                  placeholder="••••••••"
                  {...register("ancienMotDePasse")}
                  error={errors.ancienMotDePasse?.message}
                  leftIcon={<Lock className="w-4 h-4" />}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nouveau mot de passe"
                    type="password"
                    placeholder="Min 6 caractères"
                    {...register("nouveauMotDePasse")}
                    error={errors.nouveauMotDePasse?.message}
                    leftIcon={<Shield className="w-4 h-4" />}
                  />
                  <Input
                    label="Confirmation"
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmationMotDePasse")}
                    error={errors.confirmationMotDePasse?.message}
                    leftIcon={<ShieldCheck className="w-4 h-4" />}
                  />
                </div>

                {status && (
                  <div
                    className={`p-4 rounded-2xl text-sm font-bold uppercase tracking-tight flex items-center gap-3 border ${
                      status.type === "success"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                        : "bg-red-500/10 border-red-500/20 text-red-500"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${status.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
                    />
                    {status.message}
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="rounded-2xl transition-all hover:scale-[1.02]"
                  >
                    Changer le mot de passe
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-amber-500/5 border-amber-500/10 shadow-none">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <Shield className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-amber-500 uppercase tracking-tighter mb-1">
                    Protection des données
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Vos informations sont stockées conformément au RGPD. Votre
                    mot de passe est chiffré et ne peut pas être récupéré en
                    clair, même par un administrateur.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
