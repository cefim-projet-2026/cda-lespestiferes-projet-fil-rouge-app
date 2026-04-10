"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useUtilisateurs,
  useCreateUtilisateur,
  useDeleteUtilisateur,
  useClasses,
} from "@/hooks";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  Card,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import {
  UserPlus,
  Search,
  Trash2,
  Shield,
  User as UserIcon,
  GraduationCap,
} from "lucide-react";
import type { UserRole } from "@/types";

const userSchema = z.object({
  nom: z.string().min(2, "Nom trop court"),
  prenom: z.string().min(2, "Prénom trop court"),
  email: z.string().email("Email invalide"),
  role: z.enum(["RP", "FORMATEUR", "ELEVE"]),
  classeId: z.string().optional(),
  motDePasse: z.string().min(6, "6 caractères minimum"),
});

type UserFormData = z.infer<typeof userSchema>;

export default function UtilisateursPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Queries
  const { data: utilisateurs, isLoading } = useUtilisateurs({
    role: roleFilter !== "ALL" ? roleFilter : undefined,
  });
  const { data: classes } = useClasses();

  // Mutations
  const createMutation = useCreateUtilisateur();
  const deleteMutation = useDeleteUtilisateur();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { role: "ELEVE" },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: UserFormData) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        classeId: data.classeId ? parseInt(data.classeId) : undefined,
      });
      setIsDialogOpen(false);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const filteredUsers = utilisateurs?.content.filter((u) =>
    `${u.nom} ${u.prenom} ${u.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "RP":
        return <Shield className="w-4 h-4 text-primary" />;
      case "FORMATEUR":
        return <GraduationCap className="w-4 h-4 text-amber-500" />;
      case "ELEVE":
        return <UserIcon className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Gestion <span className="text-primary">Utilisateurs</span>
          </h1>
          <p className="text-slate-400">
            Gérez les comptes RP, Formateurs et Élèves de l'établissement.
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          leftIcon={<UserPlus className="w-4 h-4" />}
          className="rounded-2xl"
        >
          Nouvel Utilisateur
        </Button>
      </div>

      <Card>
        <CardHeader
          title="Liste des comptes"
          description="Filtrez et recherchez des utilisateurs par nom ou rôle."
          action={
            <div className="flex items-center gap-3">
              <div className="relative w-64 ring-primary/50">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="ALL">Tous les rôles</option>
                <option value="RP" className="bg-[#0a0a0b]">
                  RP
                </option>
                <option value="FORMATEUR" className="bg-[#0a0a0b]">
                  Formateur
                </option>
                <option value="ELEVE" className="bg-[#0a0a0b]">
                  Élève
                </option>
              </select>
            </div>
          }
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Utilisateur</TableHeader>
              <TableHeader>Rôle</TableHeader>
              <TableHeader>Classe</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader className="text-right">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center animate-pulse text-[var(--on-surface-variant)]"
                  >
                    Chargement...
                  </TableCell>
                </TableRow>
              ))
            ) : filteredUsers?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-[var(--on-surface-variant)] font-medium"
                >
                  Aucun utilisateur trouvé.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers?.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-primary">
                        {u.prenom[0]}
                        {u.nom[0]}
                      </div>
                      <div>
                        <p className="font-bold text-white uppercase tracking-wide text-xs">
                          {u.nom}
                        </p>
                        <p className="text-sm text-slate-400">{u.prenom}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 w-fit">
                      {getRoleIcon(u.role)}
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {u.role}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-slate-400">
                      {u.role === "ELEVE"
                        ? u.classe?.nom || "Sans classe"
                        : "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-400 font-mono">
                      {u.email}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-500 hover:text-red-500 hover:bg-red-500/10"
                      onClick={() => handleDelete(u.id)}
                      isLoading={
                        deleteMutation.isPending &&
                        deleteMutation.variables === u.id
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* CREATE DIALOG */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Création d'un compte"
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Prénom"
              placeholder="Ex: Jean"
              {...register("prenom")}
              error={errors.prenom?.message}
            />
            <Input
              label="Nom"
              placeholder="Ex: DUPONT"
              {...register("nom")}
              error={errors.nom?.message}
            />
          </div>

          <Input
            label="Adresse Email"
            placeholder="jean.dupont@campus.fr"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Rôle"
              options={[
                { label: "Élève", value: "ELEVE" },
                { label: "Formateur", value: "FORMATEUR" },
                { label: "Responsable Pédag.", value: "RP" },
              ]}
              {...register("role")}
              error={errors.role?.message}
            />
            {selectedRole === "ELEVE" && (
              <Select
                label="Classe"
                options={[
                  { label: "Choisir une classe", value: "" },
                  ...(classes?.content.map((c) => ({
                    label: c.nom,
                    value: c.id,
                  })) || []),
                ]}
                {...register("classeId")}
                error={errors.classeId?.message}
              />
            )}
          </div>

          <Input
            label="Mot de passe temporaire"
            type="password"
            placeholder="••••••••"
            {...register("motDePasse")}
            error={errors.motDePasse?.message}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setIsDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" isLoading={createMutation.isPending}>
              Créer le compte
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
