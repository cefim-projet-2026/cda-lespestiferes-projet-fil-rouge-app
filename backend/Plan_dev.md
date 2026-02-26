# 🏃 Sprint Planning — Campus Connect / SKOLAE

**Sprint** : Mardi 24 → Vendredi 27 février 2026 (4 jours)
**Équipe** : Tristan, Jeevons, Axel, Lucas — 7h/jour × 4 devs = **28h/jour**, **112h totales**
**Méthode** : Scrum — Daily stand-up chaque matin
**Repo** : [cda-lespestiferes-projet-fil-rouge-app](https://github.com/cefim-projet-2026/cda-lespestiferes-projet-fil-rouge-app)

---

## 📊 Contexte Projet

**Gestion Pédagogique** — Plateforme interne CEFIM, **3 rôles** :

| Rôle | Enum | Périmètre |
|------|------|-----------|
| **Responsable Pédagogique (RP)** | `RP` | Gestion utilisateurs, classes, matières, imports, exports, RGPD |
| **Formateur** | `Formateur` | Saisie notes, consultation classes assignées |
| **Élève** | `Eleve` | Consultation notes & absences |

**Stack technique** (depuis le repo) :
- **Backend** : Java 17 · Spring Boot 4.0.3 · JPA · Spring Security · Lombok · jjwt 0.12.3
- **Frontend** : Next.js + TypeScript + TailwindCSS *(à créer dans `frontend/`)*
- **BDD** : PostgreSQL (Supabase) · `ddl-auto=none` (schéma géré manuellement)
- **Package** : `fr.cefim.lespestiferes.gestionpedagogique`

---

## 🗄️ Modèle de Données (MPD)

> Source : [MPD.md](notion_docs/bdd/MPD.md) · [Dictionnaire](notion_docs/bdd/Dictionnaire_de_donnees.md)

### Tables principales

| Table | PK | Champs clés |
|-------|----|-------------|
| `utilisateur` | `id_utilisateur` | nom, prenom, email (UNIQUE), mot_de_passe, role, est_actif, statut_eleve, moyenne_generale |
| `classe` | `id_classe` | nom_filiere, nom_promotion, nom_classe, annee_scolaire |
| `matiere` | `id_matiere` | nom_matiere, credits_ects |
| `evaluation` | `id_evaluation` | id_matiere (FK), date_evaluation, type_evaluation, categorie, coefficient, semestre_trimestre |
| `note` | `id_note` | id_evaluation (FK), id_eleve (FK), valeur_note (0-20), statut_presence, commentaire |

### Tables de liaison

| Table | Clés | Relation |
|-------|------|----------|
| `appartenir` | id_eleve + id_classe | Élève ↔ Classe |
| `intervenir` | id_formateur + id_classe | Formateur ↔ Classe |
| `enseigner` | id_formateur + id_matiere | Formateur ↔ Matière |

### Enums PostgreSQL

```sql
role_enum            → 'RP', 'Formateur', 'Eleve'
statut_eleve_enum    → 'Initial', 'Alternant'
type_eval_enum       → 'QCM', 'TP', 'Restitution', 'DS', 'Autre'
cat_eval_enum        → 'Controle_Continu', 'Partiel'
statut_presence_enum → 'Present', 'Absence_Injustifiee', 'Absence_Justifiee'
```

---

## 📏 Règles Métier

> Source : [Analyse_besoin.md](notion_docs/specs/Analyse_besoin.md)

| # | Règle | Service concerné |
|---|-------|-----------------|
| RM-01 | Moyenne matière = **50% CC + 50% Partiel** | `NoteService` |
| RM-02 | ECTS validés si **moyenne ≥ 10** | `MatiereService` |
| RM-03 | Absence (justifiée ou non) = **note 0** | `NoteService` |
| RM-04 | Formateur **ne peut pas être supprimé**, seulement désactivé | `UtilisateurService` |
| RM-05 | Pas d'inscription publique, comptes créés par le RP | Auth/RP only |
| RM-06 | Formateur saisit notes **uniquement pour ses matières** | vérif via `enseigner` |
| RM-07 | Modification notes hors période → **RP uniquement** | `NoteService` |
| RM-08 | Élève voit **uniquement ses notes** | `NoteController` |
| RM-09 | Formateur voit notes **de ses classes, toutes matières** | via `intervenir` |

---

## 👥 Équipe — Rôles Sprint

| Dev | Expertise Phase 1 | Rôle Sprint |
|-----|-------------------|-------------|
| **Jeevons** | MCD, MLD, MPD, Dictionnaire | **Lead Entités & Data** |
| **Tristan** | Scripts SQL, gestion droits & sécurité | **Lead Sécurité & Config** |
| **Lucas** | Script complet, logs, backup | **Lead Services & Logique métier** |
| **Axel** | — | **Lead API & Intégration** |

---

## ✅ État du Projet (ce qui existe déjà)

| Élément | Statut | Détail |
|---------|--------|--------|
| Projet Spring Boot initialisé | ✅ Done | `pom.xml` avec toutes les dépendances |
| `SecurityConfig.java` | ⚠️ Squelette | `permitAll()` — À configurer avec JWT + rôles |
| `DatabaseConfig.java` | ✅ Done | Config Supabase via properties |
| `application.properties.example` | ✅ Done | Template complet (JWT, CORS, Hikari, logs) |
| `.gitignore` + `CONTRIBUTING.md` | ✅ Done | Workflow Git documenté |
| Entités JPA | ✅ Done | Créées dans `core/entities` |
| Repositories | ✅ Done | Interfaces créées dans `core/repositories` |
| Services métier | ✅ Done | Implémentés dans `core/services` |
| Contrôleurs REST | ✅ Done | CRUD de base (US-05) + UtilisateurController refactoré avec DTOs/validation (US-06) |
| JWT auth (login/register) | ❌ À faire | |

---

## 📋 Product Backlog

### 🔴 Must Have

| ID | User Story | Pts | Statut |
|----|-----------|-----|--------|
| **US-01** | ~~Init projet Spring Boot~~ | ~~3~~ | ✅ Done |
| **US-02** | ~~Créer les entités JPA (8 tables + 5 enums)~~ | ~~8~~ | ✅ Done |
| **US-03** | ~~Repositories Spring Data JPA~~ | ~~3~~ | ✅ Done |
| **US-04** | ~~Services métier (Utilisateur, Note, Classe, Matiere)~~ | ~~8~~ | ✅ Done |
| **US-05** | ~~Contrôleurs REST API (CRUD)~~ | ~~8~~ | ✅ Done |
| **US-06** | ~~RP : gestion utilisateurs (CRUD) via API~~ | ~~5~~ | ✅ Done |
| **US-07** | Formateur : saisir et consulter les notes | 8 | ❌ |
| **US-08** | Élève : consulter ses notes par matière | 5 | ❌ |

### 🟡 Should Have

| ID | User Story | Pts |
|----|-----------|-----|
| **US-09** | Spring Security avec rôles (RP/Formateur/Élève) | 8 |
| **US-10** | Authentification JWT (login/register) | 5 |
| **US-11** | RP : import étudiants JSON/CSV | 5 |
| **US-12** | RP : moyennes par filière/promotion | 5 |
| **US-13** | Formateur : tableau de bord classes | 5 |

### 🟢 Could Have

| ID | User Story | Pts |
|----|-----------|-----|
| **US-14** | Élève : progression ECTS | 3 |
| **US-15** | RP : export relevés PDF | 5 |
| **US-16** | Formateur : calendrier évaluations | 5 |
| **US-17** | RP : rapports Qualiopi | 8 |

---

## 📅 Planning Quotidien

### 🟦 MARDI 24/02 — Focus Backend Java Spring

**Objectif** : Entités JPA, premiers services et endpoints.

#### Jeevons — Entités JPA & Repositories (7h)

| Tâche | Durée |
|-------|-------|
| Entité `Utilisateur` + enums `Role`, `StatutEleve` | 1.5h |
| Entité `Classe` + relations N:N (`Appartenir`, `Intervenir`) | 1.5h |
| Entité `Matiere` + `Evaluation` + enums `TypeEval`, `CatEval` | 1.5h |
| Entité `Note` + enum `StatutPresence` (FK → Evaluation, Utilisateur) | 1h |
| Entité `Enseigner` (liaison Formateur-Matière) | 0.5h |
| Repositories JPA + requêtes custom | 1h |

> **Branch** : `feature/entites-jpa`

#### Tristan — Sécurité JWT (7h)

| Tâche | Durée |
|-------|-------|
| Copier `application.properties.example` → `application.properties` avec vrais credentials | 0.5h |
| Upgrader `SecurityConfig` : rôles RP/Formateur/Élève, endpoints protégés | 2h |
| `JwtService` : génération + validation token (utiliser jjwt 0.12.3 du pom) | 2h |
| `AuthController` : `POST /api/auth/login`, `POST /api/auth/register` | 1.5h |
| Config CORS pour frontend Next.js | 0.5h |
| Tests manuels auth (curl/Postman) | 0.5h |

> **Branch** : `feature/securite-jwt`

#### Lucas — Services Métier (7h)

| Tâche | Durée |
|-------|-------|
| `UtilisateurService` : CRUD, email unique, désactivation formateur (RM-04) | 2h |
| `NoteService` : saisie, moyennes 50/50 CC/Partiel (RM-01), absences (RM-03) | 2.5h |
| `ClasseService` : gestion classes, inscriptions élèves | 1.5h |
| `MatiereService` : CRUD, validation ECTS ≥ 10 (RM-02) | 1h |

> **Branch** : `feature/services-metier`

#### Axel — Contrôleurs REST & DTOs (7h)

| Tâche | Durée |
|-------|-------|
| DTOs : `UtilisateurDTO`, `NoteDTO`, `ClasseDTO`, `EvaluationDTO` | 1.5h |
| `UtilisateurController` : CRUD `/api/utilisateurs` | 1.5h |
| `NoteController` : `/api/notes/eleve/{id}`, filtrage visibilité (RM-08) | 1.5h |
| `ClasseController` + `MatiereController` | 1.5h |
| Tests manuels endpoints (Postman/curl) | 1h |

> **Branch** : `feature/controllers-rest`

---

### 🟦 MERCREDI 25/02 — Backend Avancé + Tests

| Dev | Focus | US |
|-----|-------|-----|
| **Jeevons** | Relations complexes, vues agrégées, moyennes par classe | US-12 |
| **Tristan** | Sécurisation fine par rôle (RM-05/07), tests auth | US-09, US-10 |
| **Lucas** | Moyennes pondérées, import JSON (RM-06/09) | US-07, US-11 |
| **Axel** | API formateur + Swagger OpenAPI | US-07, US-13 |

---

### 🟦 JEUDI 26/02 — Intégration Frontend

| Dev | Focus | US |
|-----|-------|-----|
| **Jeevons** | Pages élève (notes, moyennes) | US-08 |
| **Tristan** | Page login + session JWT frontend | US-10 |
| **Lucas** | Services API Next.js (fetch, hooks, error handling) | Intégration |
| **Axel** | Pages formateur (saisie notes, tableau de bord) | US-07, US-13 |

---

### 🟦 VENDREDI 27/02 — Polish, Tests & Démo

| Dev | Focus | US |
|-----|-------|-----|
| **Jeevons** | Export PDF + progression ECTS | US-15, US-14 |
| **Tristan** | Tests E2E sécurité, bugs, documentation | Qualité |
| **Lucas** | Rapports Qualiopi + dashboard stats | US-17, US-06 |
| **Axel** | UI polish, responsive, démo, staging | UX + DevOps |

---

## 🛠️ Architecture Backend (repo existant)

```
backend/src/main/java/fr/cefim/lespestiferes/gestionpedagogique/
├── GestionPedagogiqueApplication.java     ← ✅ Existe
├── config/
│   ├── SecurityConfig.java                ← ✅ Existe (à upgrader)
│   ├── DatabaseConfig.java                ← ✅ Existe
│   ├── CorsConfig.java                    ← À créer
│   └── JwtConfig.java                     ← À créer
├── controller/                            ← À créer
│   ├── AuthController.java
│   ├── UtilisateurController.java
│   ├── NoteController.java
│   ├── ClasseController.java
│   └── MatiereController.java
├── dto/                                   ← À créer
│   ├── request/
│   └── response/
├── entity/                                ← À créer
│   ├── Utilisateur.java
│   ├── Classe.java
│   ├── Matiere.java
│   ├── Evaluation.java
│   ├── Note.java
│   ├── Appartenir.java
│   ├── Intervenir.java
│   ├── Enseigner.java
│   └── enums/
├── repository/                            ← À créer
├── service/                               ← À créer
└── exception/                             ← À créer
```

---

## 🔀 Git Workflow

> Détails complets dans [CONTRIBUTING.md](cda-lespestiferes-projet-fil-rouge-app/CONTRIBUTING.md)

```
production (🔒 protégée, 2 reviews)
    ↑ Pull Request
master (développement)
    ↑ Merge feature branches
feature/nom-fonctionnalite
```

**Conventions commits** : `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`

---

## 📂 Structure Globale du Projet

```
Projet_Cours/
├── cda-lespestiferes-projet-fil-rouge-app/   ← Repo Git principal
│   ├── backend/                               # Spring Boot 4.0.3
│   └── frontend/                              # Next.js (à créer)
├── campus_connect/                            ← Prototype frontend existant
├── docs/                                      ← PDFs (MPD, scripts, backup)
├── notion_docs/                               ← Docs Notion organisés
│   ├── bdd/                                   # MPD, Dictionnaire, images MCD/MLD
│   ├── scripts/                               # SQL complet, exécuté, logs, sécurité
│   ├── specs/                                 # Analyse besoin, Livrables
│   └── backup/                                # Backup & sauvegarde
├── notion/                                    ← Export brut Notion (CSV)
├── Plan_dev.md                                ← Ce fichier
├── app.puml                                   ← Diagramme d'activité
└── plan.svg                                   ← Rendu visuel diagramme
```

---

## 📌 Points d'Attention

> [!WARNING]
> Les entités JPA doivent correspondre exactement au MPD PostgreSQL — `ddl-auto=none` ⇒ pas de génération auto du schéma. Voir [MPD.md](notion_docs/bdd/MPD.md).

> [!IMPORTANT]
> Le `application.properties` est **gitignored** (credentials Supabase). Chaque dev doit copier le `.example` et mettre ses vrais credentials.

> [!NOTE]
> Les triggers d'audit du [script_log.sql](docs/script_log.sql) cohabitent avec le backend. `DatabaseConfig` est déjà configuré pour Supabase.

---

## 🎯 Sprint Goal

> **Vendredi 27/02 EOD** : Backend Spring Boot fonctionnel connecté à PostgreSQL Supabase, API REST sécurisées JWT avec 3 rôles (RP/Formateur/Élève), CRUD utilisateurs/notes/classes/matières avec règles métier (50/50 CC/Partiel, ECTS, visibilité), frontend Next.js connecté pour login + consultation notes.
