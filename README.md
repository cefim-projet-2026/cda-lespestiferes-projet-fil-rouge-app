# 📚 Projet Fil Rouge - Plateforme de Gestion Pédagogique

> Application web interne de gestion d'établissement scolaire développée dans le cadre de la formation CEFIM.

## 🎯 Objectif du Projet

Développer une solution full-stack permettant aux équipes pédagogiques de gérer efficacement :
- ✅ Les notes et évaluations des élèves
- ✅ Les promotions et classes
- ✅ Les absences et présences
- ✅ Les moyennes automatisées (élève et classe)
- ✅ Les imports massifs de données (JSON/CSV)

## 🛠️ Stack Technique

**Frontend**
- Next.js 14+ (React)
- TypeScript
- TailwindCSS / Shadcn UI

**Backend**
- Java 17
- Spring Boot 3.4.2
- Spring Security (authentification JWT)
- Spring Data JPA

**Base de données**
- PostgreSQL 14+
- Row Level Security (RLS)
- Triggers & Fonctions PL/pgSQL
- Sauvegarde automatisée

## 👥 Acteurs & Rôles

| Rôle | Permissions |
|------|-------------|
| **Responsable Pédagogique (RP)** | Accès total : gestion utilisateurs, classes, matières, imports |
| **Formateur** | Saisie des notes, consultation des classes assignées |
| **Élève** | Consultation de ses notes et absences |

## 📊 Fonctionnalités Principales

### Module Notes
- Saisie et modification des notes par évaluation
- Calcul automatique des moyennes pondérées (coefficients)
- Gestion des absences (justifiées/injustifiées)
- Historique complet des évaluations

### Module Classes
- Création et gestion des promotions
- Affectation élèves/formateurs
- Calcul automatique de la moyenne de classe
- Vue d'ensemble des performances

### Module Import
- Import massif d'élèves (format JSON)
- Validation et rapport d'erreurs détaillé
- Historique des imports avec traçabilité

## 🔒 Sécurité

- **Authentification** : JWT avec refresh tokens
- **Autorisation** : RBAC (Role-Based Access Control)
- **Base de données** : Row Level Security (RLS) PostgreSQL
- **Mots de passe** : Hashage BCrypt
- **Audit** : Logs des actions sensibles

## 📁 Structure du Projet

```
projet_fil_rouge/
├── backend/        # API REST Spring Boot
└── frontend/       # Application Next.js
```

## 🚀 Installation

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## 📝 Conventions de Développement

### Branches Git
- `production` : Code stable en production (protégée)
- `master` : Branche de développement principale
- `feature/nom-fonctionnalite` : Branches de fonctionnalités

### Commits
```
feat: ajout du système de notes
fix: correction calcul moyenne
refactor: optimisation des requêtes SQL
docs: mise à jour du README
```

## 🚀 Équipe

Projet réalisé par l'équipe Les Pestifères - Promotion CEFIM 2026

## 📝 Licence

Projet académique - Tous droits réservés
