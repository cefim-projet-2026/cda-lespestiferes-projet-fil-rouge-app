import type {
  User,
  Classe,
  Matiere,
  Evaluation,
  Note,
  NoteWithDetails,
  GlobalStats,
} from "@/types";

export const MOCK_USERS: User[] = [
  { id: 1, nom: "ADMIN", prenom: "Tristan", email: "rp@campus.fr", role: "RP" },
  {
    id: 2,
    nom: "DURAND",
    prenom: "Marc",
    email: "m.durand@campus.fr",
    role: "FORMATEUR",
  },
  {
    id: 3,
    nom: "LEROY",
    prenom: "Sophie",
    email: "s.leroy@campus.fr",
    role: "FORMATEUR",
  },
  {
    id: 4,
    nom: "DUPONT",
    prenom: "Jean",
    email: "jean.dupont@campus.fr",
    role: "ELEVE",
    classeId: 1,
  },
  {
    id: 5,
    nom: "MARTIN",
    prenom: "Alice",
    email: "alice.martin@campus.fr",
    role: "ELEVE",
    classeId: 1,
  },
  {
    id: 6,
    nom: "BERNARD",
    prenom: "Lucas",
    email: "lucas.bernard@campus.fr",
    role: "ELEVE",
    classeId: 2,
  },
];

export const MOCK_CLASSES: Classe[] = [
  {
    id: 1,
    nom: "BTS SIO 2A",
    promotion: "2024-2025",
    formateurId: 2,
    nbEleves: 12,
    moyenneGenerale: 14.5,
    formateur: MOCK_USERS[1],
  },
  {
    id: 2,
    nom: "Bachelor Dev 3",
    promotion: "2023-2024",
    formateurId: 3,
    nbEleves: 18,
    moyenneGenerale: 12.2,
    formateur: MOCK_USERS[2],
  },
];

export const MOCK_MATIERES: Matiere[] = [
  {
    id: 1,
    nom: "Algorithmique & Java",
    coefficient: 4.0,
    formateurId: 2,
    formateur: MOCK_USERS[1],
  },
  {
    id: 2,
    nom: "Architecture Réseau",
    coefficient: 3.0,
    formateurId: 3,
    formateur: MOCK_USERS[2],
  },
  {
    id: 3,
    nom: "Gestion de Projet",
    coefficient: 2.0,
    formateurId: 2,
    formateur: MOCK_USERS[1],
  },
];

export const MOCK_EVALUATIONS: Evaluation[] = [
  {
    id: 1,
    nom: "DST Java Semaine 3",
    date: "2026-03-15T09:00:00Z",
    coefficient: 2.0,
    matiereId: 1,
    classeId: 1,
    matiere: MOCK_MATIERES[0],
    classe: MOCK_CLASSES[0],
  },
  {
    id: 2,
    nom: "Projet Final Réseau",
    date: "2026-04-10T14:00:00Z",
    coefficient: 3.0,
    matiereId: 2,
    classeId: 2,
    matiere: MOCK_MATIERES[1],
    classe: MOCK_CLASSES[1],
  },
  {
    id: 3,
    nom: "Quiz Gestion Agile",
    date: "2026-03-20T11:00:00Z",
    coefficient: 1.0,
    matiereId: 3,
    classeId: 1,
    matiere: MOCK_MATIERES[2],
    classe: MOCK_CLASSES[0],
  },
];

export const MOCK_NOTES: NoteWithDetails[] = [
  {
    id: 1,
    valeur: 15.5,
    presence: "PRESENT",
    commentaire: "Bon travail sur la POO.",
    eleveId: 4,
    evaluationId: 1,
    createdAt: "2026-03-16T10:00:00Z",
    updatedAt: "2026-03-16T10:00:00Z",
    eleve: MOCK_USERS[3],
    evaluation: MOCK_EVALUATIONS[0],
  },
  {
    id: 2,
    valeur: 12.0,
    presence: "PRESENT",
    commentaire: "Des erreurs de syntaxe évitables.",
    eleveId: 5,
    evaluationId: 1,
    createdAt: "2026-03-16T11:00:00Z",
    updatedAt: "2026-03-16T11:00:00Z",
    eleve: MOCK_USERS[4],
    evaluation: MOCK_EVALUATIONS[0],
  },
  {
    id: 3,
    valeur: 0,
    presence: "ABSENT_JUSTIFIE",
    commentaire: "Certificat médical reçu.",
    eleveId: 4,
    evaluationId: 3,
    createdAt: "2026-03-21T09:00:00Z",
    updatedAt: "2026-03-21T09:00:00Z",
    eleve: MOCK_USERS[3],
    evaluation: MOCK_EVALUATIONS[2],
  },
];

export const MOCK_STATS: GlobalStats = {
  nbClasses: 5,
  nbEleves: 84,
  nbFormateurs: 12,
  nbMatieres: 45,
  moyenneGenerale: 13.8,
};
