# 🤝 Guide de Contribution - Projet Fil Rouge

## 🌳 Workflow Git

### Structure des Branches

```
production (🔒 protégée - code stable)
    ↑
    | Pull Request + 2 Reviews obligatoires
    |
master (🔓 développement principal)
    ↑
    | Merge depuis branches features
    |
feature/nom-fonctionnalite (branches personnelles)
```

---

## 📋 Créer une Branche de Travail

### 1️⃣ Partir de `master` à jour

```bash
git checkout master
git pull origin master
```

### 2️⃣ Créer sa branche

**Convention de nommage :**

```bash
# Nouvelle fonctionnalité
git checkout -b feature/ajout-notes

# Correction de bug
git checkout -b fix/bug-calcul-moyenne

# Refactoring
git checkout -b refactor/service-utilisateur

# Documentation
git checkout -b docs/readme-api
```

**Format recommandé :** `type/description-courte-en-kebab-case`

---

## 💾 Travailler sur sa Branche

### Commits réguliers

```bash
# Ajouter les fichiers modifiés
git add .

# Ou ajouter fichier par fichier
git add src/main/java/...

# Commit avec message clair
git commit -m "feat: ajout du formulaire de saisie des notes"

# Push vers GitHub
git push -u origin feature/ajout-notes
```

### Convention de Messages de Commit

```
<type>: <description courte>

[corps optionnel]

[footer optionnel]
```

**Types de commits :**

| Type | Description | Exemple |
|------|-------------|---------|
| `feat` | Nouvelle fonctionnalité | `feat: ajout du système de notes` |
| `fix` | Correction de bug | `fix: correction calcul moyenne` |
| `refactor` | Refactorisation | `refactor: optimisation des requêtes SQL` |
| `docs` | Documentation | `docs: mise à jour du README` |
| `style` | Format code (sans changement logique) | `style: formatage avec Prettier` |
| `test` | Ajout/modification tests | `test: ajout tests unitaires NoteService` |
| `chore` | Tâches maintenance | `chore: mise à jour dépendances` |

**Exemples concrets :**

```bash
git commit -m "feat: ajout endpoint GET /api/notes/{id}"
git commit -m "fix: correction NPE dans UtilisateurService"
git commit -m "refactor: extraction méthode calculerMoyenne"
git commit -m "docs: ajout JavaDoc sur NoteController"
```

---

## 🔄 Merger vers `master`

### Option A : Pull Request (Recommandé) ✅

1. **Sur GitHub**, cliquez sur **"Compare & pull request"**
2. **Base:** `master` ← **Compare:** `feature/votre-branche`
3. **Titre clair :** "Ajout du système de gestion des notes"
4. **Description détaillée :**
   ```markdown
   ## 🎯 Objectif
   Implémentation du CRUD pour la gestion des notes

   ## ✅ Changements
   - Ajout entité Note
   - Création NoteRepository
   - Implémentation NoteService avec calcul de moyenne
   - Endpoints REST dans NoteController

   ## 🧪 Tests
   - Tests unitaires NoteService
   - Tests d'intégration NoteController

   ## 📸 Screenshots (si applicable)
   [captures d'écran]
   ```
5. **Assigner un reviewer** (coéquipier)
6. Attendre la review et les retours
7. Apporter les corrections si nécessaire
8. Une fois approuvé → **"Merge pull request"**
9. **"Delete branch"** sur GitHub après le merge

### Option B : Merge Direct (si pas de protection)

```bash
# Se mettre sur master
git checkout master

# Récupérer les dernières mises à jour
git pull origin master

# Merger sa branche
git merge feature/ajout-notes

# Résoudre les conflits si nécessaire
# (éditer les fichiers, puis git add + git commit)

# Pousser vers GitHub
git push origin master

# Supprimer la branche locale
git branch -d feature/ajout-notes

# Supprimer la branche distante
git push origin --delete feature/ajout-notes
```

---

## 🚨 Éviter les Conflits

### Synchroniser régulièrement avec `master`

```bash
# Sur votre branche feature
git checkout feature/ma-fonctionnalite

# Récupérer master à jour
git fetch origin master

# Rebaser (ou merger) master dans votre branche
git rebase origin/master
# ou
git merge origin/master

# Résoudre les conflits si nécessaire
# Puis pousser
git push --force-with-lease origin feature/ma-fonctionnalite
```

**💡 Conseil :** Faites un rebase/merge de `master` dans votre branche **tous les jours** !

---

## 🚀 Mise en Production

Quand `master` est stable et testé :

### 1. Créer une Pull Request `master` → `production`

```
Titre : Release v1.0.0 - [Date]

Description :
## 🚀 Contenu de la Release

### ✨ Nouvelles fonctionnalités
- Gestion complète des notes
- Calcul automatique des moyennes
- Système d'authentification JWT

### 🐛 Corrections
- Fix calcul moyenne avec coefficients

### 📝 Documentation
- Mise à jour API documentation

### 🧪 Tests
- Coverage: 85%
- Tous les tests passent ✅
```

### 2. Demander 2 Reviews obligatoires

### 3. Une fois approuvé → Merge vers `production`

### 4. Tagger la release (optionnel)

```bash
git checkout production
git pull origin production
git tag -a v1.0.0 -m "Release 1.0.0 - Système de gestion des notes"
git push origin v1.0.0
```

---

## ⚠️ Règles d'Or

### ✅ À FAIRE

1. **Toujours partir de `master` à jour** avant de créer une branche
2. **Commits atomiques** (1 fonctionnalité = 1 commit)
3. **Messages de commit clairs** (convention respectée)
4. **Push régulièrement** (plusieurs fois par jour)
5. **Pull `master` régulièrement** dans votre branche
6. **Tester avant de push** (compilation + tests unitaires)
7. **Demander des reviews** de code
8. **Supprimer les branches** après merge

### ❌ À NE PAS FAIRE

1. ❌ **Ne jamais pusher directement sur `production`**
2. ❌ **Ne jamais force push sur `master`** (sauf si vous savez ce que vous faites)
3. ❌ **Ne jamais commit des fichiers sensibles** (.env, credentials, mots de passe)
4. ❌ **Ne jamais commit des fichiers générés** (target/, node_modules/, .class)
5. ❌ **Ne jamais commit du code qui ne compile pas**
6. ❌ **Ne jamais laisser des `System.out.println()` ou `console.log()` dans le code**

---

## 🛠️ Commandes Utiles

### Voir l'état de votre branche

```bash
git status
git log --oneline -10
git diff
```

### Annuler des modifications

```bash
# Annuler modifications d'un fichier (avant commit)
git checkout -- fichier.java

# Annuler le dernier commit (en gardant les modifs)
git reset --soft HEAD~1

# Annuler le dernier commit (en supprimant les modifs)
git reset --hard HEAD~1
```

### Résoudre des conflits

```bash
# Voir les fichiers en conflit
git status

# Après avoir résolu manuellement les conflits
git add fichier-resolu.java
git commit -m "resolve: fusion de master dans feature/ma-branche"
```

### Nettoyer les branches locales

```bash
# Lister toutes les branches
git branch -a

# Supprimer une branche locale
git branch -d nom-branche

# Supprimer une branche distante
git push origin --delete nom-branche

# Nettoyer les références obsolètes
git fetch --prune
```

---

## 📞 Besoin d'Aide ?

- **Conflits Git :** Demandez de l'aide à un coéquipier
- **Questions code :** Créez une issue sur GitHub
- **Blocage :** Demandez une review de code

---

## 🎯 Checklist Avant de Créer une PR

- [ ] Le code compile sans erreur
- [ ] Les tests passent
- [ ] Le code est formaté correctement
- [ ] Pas de `System.out.println()` / `console.log()`
- [ ] Pas de code commenté inutile
- [ ] Les variables ont des noms explicites
- [ ] Documentation/JavaDoc à jour
- [ ] Pas de fichiers sensibles committés
- [ ] Branche à jour avec `master`

---

**Bon développement ! 🚀**
