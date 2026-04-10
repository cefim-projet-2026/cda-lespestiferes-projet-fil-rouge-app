// ─── Rôles ────────────────────────────────────────────────────────────────────

export type UserRole = "RP" | "FORMATEUR" | "ELEVE";

// ─── Entités ──────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  classeId?: number; // optionnel car pour les élèves uniquement
  classe?: Classe;
}

export interface Classe {
  id: number;
  nom: string;
  promotion: string;
  formateurId?: number;
  formateur?: User;
  moyenneGenerale?: number;
  nbEleves?: number;
}

export interface Matiere {
  id: number;
  nom: string;
  coefficient: number;
  formateurId?: number;
  formateur?: User;
}

export interface Evaluation {
  id: number;
  nom: string;
  date: string; // ISO date string
  coefficient: number;
  matiereId: number;
  matiere?: Matiere;
  classeId: number;
  classe?: Classe;
}

export interface Note {
  id: number;
  valeur: number; // 0–20
  presence: PresenceType;
  commentaire?: string;
  eleveId: number;
  evaluationId: number;
  createdAt: string;
  updatedAt: string;
}

export interface NoteWithDetails extends Note {
  eleve: User;
  evaluation: Evaluation;
}

export type PresenceType =
  | "PRESENT"
  | "ABSENT_JUSTIFIE"
  | "ABSENT_NON_JUSTIFIE";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
}

export interface LoginPayload {
  email: string;
  motDePasse: string;
}

export interface ChangePasswordPayload {
  ancienMotDePasse: string;
  nouveauMotDePasse: string;
  confirmationMotDePasse: string;
}

// ─── API Generics ──────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// ─── Payloads de création ─────────────────────────────────────────────────────

export interface CreateNotePayload {
  valeur: number;
  presence: PresenceType;
  commentaire?: string;
  eleveId: number;
  evaluationId: number;
}

export interface UpdateNotePayload extends Partial<CreateNotePayload> {}

export interface CreateUserPayload {
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  classeId?: number;
  motDePasse: string;
}

export interface CreateClassePayload {
  nom: string;
  promotion: string;
  formateurId?: number;
}

export interface CreateMatierePayload {
  nom: string;
  coefficient: number;
  formateurId?: number;
}

export interface CreateEvaluationPayload {
  nom: string;
  date: string;
  coefficient: number;
  matiereId: number;
  classeId: number;
}

// ─── Import JSON ──────────────────────────────────────────────────────────────

export interface ImportNoteItem {
  eleveEmail: string;
  evaluationId: number;
  valeur: number;
  presence?: PresenceType;
  commentaire?: string;
}

export interface ImportResult {
  total: number;
  success: number;
  errors: Array<{ ligne: number; message: string }>;
}

// ─── Stats RP Dashboard ───────────────────────────────────────────────────────

export interface GlobalStats {
  nbClasses: number;
  nbEleves: number;
  nbFormateurs: number;
  nbMatieres: number;
  moyenneGenerale: number;
}
