import { PresenceType } from "@/types";

export function getGradeColor(value: number): string {
  if (value < 10) return "text-red-600 font-semibold";
  if (value < 14) return "text-amber-500 font-semibold";
  return "text-emerald-500 font-semibold";
}

export function formatPresence(presence: PresenceType): string {
  switch (presence) {
    case "PRESENT":
      return "Présent";
    case "ABSENT_JUSTIFIE":
      return "Absent (justifié)";
    case "ABSENT_NON_JUSTIFIE":
      return "Absent (non just.)";
    default:
      return "Inconnu";
  }
}

export function getBadgePresenceVariant(presence: PresenceType) {
  switch (presence) {
    case "PRESENT":
      return "default";
    case "ABSENT_JUSTIFIE":
      return "secondary";
    case "ABSENT_NON_JUSTIFIE":
      return "destructive";
    default:
      return "outline";
  }
}
