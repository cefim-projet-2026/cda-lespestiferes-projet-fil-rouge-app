"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dialog } from "@/components/ui/Dialog";
import { BookOpen, AlertCircle } from "lucide-react";
import type { CreateNotePayload, PresenceType } from "@/types";

const noteSchema = z.object({
  valeur: z.preprocess(
    (val) => (typeof val === "number" ? val.toString() : val),
    z
      .string()
      .transform((val) => parseFloat(val))
      .refine((val) => val >= 0 && val <= 20, "Note entre 0 et 20"),
  ),
  presence: z.enum(["PRESENT", "ABSENT_JUSTIFIE", "ABSENT_NON_JUSTIFIE"]),
  commentaire: z.string().optional(),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface NoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  eleveName: string;
  initialData?: {
    valeur: number;
    presence: PresenceType;
    commentaire?: string;
  };
  isSubmitting: boolean;
}

export function NoteForm({
  isOpen,
  onClose,
  onSubmit,
  eleveName,
  initialData,
  isSubmitting,
}: NoteFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      valeur: initialData?.valeur.toString() ?? "0",
      presence: initialData?.presence ?? "PRESENT",
      commentaire: initialData?.commentaire ?? "",
    },
  });

  const presenceValue = watch("presence");

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Saisir une note pour ${eleveName}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
          <BookOpen className="w-5 h-5 text-primary" />
          <p className="text-sm font-medium text-slate-300">
            Modification de la note finale pour cet étudiant.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Note (/20)"
            type="number"
            step="0.25"
            min="0"
            max="20"
            disabled={presenceValue !== "PRESENT"}
            {...register("valeur")}
            error={errors.valeur?.message}
          />
          <Select
            label="Présence"
            options={[
              { label: "Présent", value: "PRESENT" },
              { label: "Absent (justifié)", value: "ABSENT_JUSTIFIE" },
              { label: "Absent (NON justifié)", value: "ABSENT_NON_JUSTIFIE" },
            ]}
            {...register("presence")}
            error={errors.presence?.message}
          />
        </div>

        <Input
          label="Commentaire (Optionnel)"
          placeholder="Appréciation, motif d'absence..."
          {...register("commentaire")}
          error={errors.commentaire?.message}
        />

        {presenceValue !== "PRESENT" && (
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
            <AlertCircle className="w-4 h-4" />
            La note sera ignorée si l'élève est absent.
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Enregistrer la note
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
