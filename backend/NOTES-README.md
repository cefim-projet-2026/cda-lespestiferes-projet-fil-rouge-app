# Formateur - Saisir et consulter les notes

## 📋 Description

Cette User Story permet aux formateurs de :
- **Saisir** des notes pour les évaluations
- **Consulter** les notes des élèves
- **Modifier** les notes existantes
- **Filtrer** les notes par élève, évaluation, matière ou formateur

## 🏗️ Architecture

### Structure mise en place

```
backend/src/main/java/fr/cefim/lespestiferes/gestionpedagogique/
├── dto/
│   ├── request/
│   │   └── NoteRequestDTO.java          # DTO d'entrée avec validation
│   └── response/
│       ├── NoteResponseDTO.java         # DTO de sortie avec détails
│       └── NoteSyntheseDTO.java         # DTO pour synthèse par matière
├── core/
│   ├── controllers/
│   │   ├── NoteController.java          # Endpoints REST
│   │   └── AdviceController.java        # Gestion globale des erreurs
│   ├── services/
│   │   └── NoteService.java             # Logique métier
│   └── repositories/
│       └── NoteRepository.java          # Accès données (JPQL + SQL natif)
└── exception/
    ├── ResourceNotFoundException.java    # 404
    ├── DuplicateResourceException.java  # 409
    └── BusinessRuleException.java       # 422
```

## 🔌 Endpoints API

### Base URL : `/api/notes`

| Méthode | Endpoint | Description | Sécurité |
|---------|----------|-------------|----------|
| `GET` | `/api/notes` | Liste toutes les notes | FORMATEUR, RP |
| `GET` | `/api/notes/{id}` | Récupère une note par ID | FORMATEUR, RP |
| `GET` | `/api/notes/eleve/{idEleve}` | Notes d'un élève | FORMATEUR, RP, ELEVE |
| `GET` | `/api/notes/evaluation/{idEvaluation}` | Notes d'une évaluation | FORMATEUR, RP |
| `GET` | `/api/notes/matiere/{idMatiere}` | Notes d'une matière | FORMATEUR, RP |
| `GET` | `/api/notes/formateur/{idFormateur}` | Notes d'un formateur | FORMATEUR, RP |
| `POST` | `/api/notes` | Crée une nouvelle note | FORMATEUR, RP |
| `PUT` | `/api/notes/{id}` | Modifie une note | FORMATEUR, RP |
| `DELETE` | `/api/notes/{id}` | Supprime une note | FORMATEUR, RP |

## 📝 DTOs

### NoteRequestDTO (Entrée)

```json
{
  "idEvaluation": 1,
  "idEleve": 5,
  "valeurNote": 15.5,
  "statutPresence": "PRESENT",
  "commentaire": "Bon travail"
}
```

**Validations :**
- `idEvaluation` : obligatoire
- `idEleve` : obligatoire
- `valeurNote` : entre 0 et 20
- `statutPresence` : obligatoire (PRESENT, ABSENCE_JUSTIFIEE, ABSENCE_INJUSTIFIEE)

### NoteResponseDTO (Sortie)

```json
{
  "idNote": 42,
  "valeurNote": 15.5,
  "statutPresence": "PRESENT",
  "commentaire": "Bon travail",
  "dateSaisie": "2026-02-26T10:30:00",
  "idEvaluation": 1,
  "nomMatiere": "Mathématiques",
  "typeEvaluation": "ECRIT",
  "categorieEvaluation": "CONTROLE_CONTINU",
  "idEleve": 5,
  "nomEleve": "Dupont",
  "prenomEleve": "Jean"
}
```

## 🗄️ Repository - Requêtes natives

Le `NoteRepository` utilise des **requêtes natives SQL** pour optimiser les performances :

### Exemples de requêtes

#### 1. Notes d'une évaluation avec détails (SQL natif)
```java
@Query(value = """
    SELECT n.* 
    FROM note n
    INNER JOIN utilisateur u ON n.id_eleve = u.id_utilisateur
    INNER JOIN evaluation e ON n.id_evaluation = e.id_evaluation
    WHERE n.id_evaluation = :idEvaluation
    ORDER BY u.nom, u.prenom
    """, nativeQuery = true)
List<Note> findByEvaluationWithDetails(@Param("idEvaluation") Integer idEvaluation);
```

#### 2. Notes d'un formateur (jointures multiples)
```java
@Query(value = """
    SELECT DISTINCT n.* 
    FROM note n
    INNER JOIN evaluation e ON n.id_evaluation = e.id_evaluation
    INNER JOIN matiere m ON e.id_matiere = m.id_matiere
    INNER JOIN enseigner ens ON m.id_matiere = ens.id_matiere
    WHERE ens.id_formateur = :idFormateur
    ORDER BY n.date_saisie DESC
    """, nativeQuery = true)
List<Note> findByFormateurNative(@Param("idFormateur") Integer idFormateur);
```

#### 3. Notes d'un élève avec FETCH JOIN (JPQL optimisé)
```java
@Query("SELECT n FROM Note n " +
       "JOIN FETCH n.evaluation e " +
       "JOIN FETCH e.matiere m " +
       "JOIN FETCH n.eleve u " +
       "WHERE u.idUtilisateur = :idEleve " +
       "ORDER BY e.dateEvaluation DESC")
List<Note> findByEleveWithDetails(@Param("idEleve") Integer idEleve);
```

## 🔒 Règles métier implémentées

### RM-03 : Absence = Note 0
Les absences (justifiées ou non) sont automatiquement notées 0.

```java
if (note.getStatutPresence() == StatutPresenceEnum.ABSENCE_INJUSTIFIEE
        || note.getStatutPresence() == StatutPresenceEnum.ABSENCE_JUSTIFIEE) {
    note.setValeurNote(BigDecimal.ZERO);
}
```

### RM-01 : Calcul de moyenne
Moyenne matière = 50% CC + 50% Partiel

```java
@Transactional(readOnly = true)
public BigDecimal calculerMoyenneMatiere(Integer idEleve, Integer idMatiere) {
    List<Note> notesCC = noteRepository.findByEleveAndMatiereAndCategorie(
        idEleve, idMatiere, CatEvalEnum.CONTROLE_CONTINU);
    List<Note> notesPartiel = noteRepository.findByEleveAndMatiereAndCategorie(
        idEleve, idMatiere, CatEvalEnum.PARTIEL);
    
    BigDecimal moyenneCC = calculerMoyenne(notesCC);
    BigDecimal moyennePartiel = calculerMoyenne(notesPartiel);
    
    return moyenneCC.add(moyennePartiel)
        .divide(BigDecimal.valueOf(2), 2, RoundingMode.HALF_UP);
}
```

## ⚠️ Gestion des erreurs

Le `AdviceController` intercepte et formate toutes les erreurs :

| Code | Exception | Description |
|------|-----------|-------------|
| 400 | `MethodArgumentNotValidException` | Erreur de validation (@Valid) |
| 404 | `ResourceNotFoundException` | Ressource introuvable |
| 409 | `DuplicateResourceException` | Doublon détecté |
| 422 | `BusinessRuleException` | Règle métier violée |

### Exemple de réponse d'erreur

```json
{
  "timestamp": "2026-02-26T10:30:00",
  "status": 404,
  "erreur": "Not Found",
  "message": "Note introuvable avec l'id : 99"
}
```

## 🧪 Tests recommandés

### 1. Créer une note
```bash
POST /api/notes
Content-Type: application/json

{
  "idEvaluation": 1,
  "idEleve": 5,
  "valeurNote": 15.5,
  "statutPresence": "PRESENT",
  "commentaire": "Excellent travail"
}
```

### 2. Consulter les notes d'un élève
```bash
GET /api/notes/eleve/5
```

### 3. Consulter les notes d'une évaluation
```bash
GET /api/notes/evaluation/1
```

### 4. Modifier une note
```bash
PUT /api/notes/42
Content-Type: application/json

{
  "idEvaluation": 1,
  "idEleve": 5,
  "valeurNote": 16.0,
  "statutPresence": "PRESENT",
  "commentaire": "Très bon travail"
}
```

## 🔐 Sécurité (à activer)

Les annotations `@PreAuthorize` sont commentées en attendant l'implémentation de JWT (US-09/US-10).

Une fois JWT activé, décommenter :
```java
@PreAuthorize("hasRole('FORMATEUR') or hasRole('RP')")
```

## 📊 Points d'amélioration futurs

1. **Pagination** : Ajouter pagination pour les listes de notes
2. **Filtres avancés** : Ajouter filtres par date, statut présence, etc.
3. **Bulk operations** : Saisie multiple de notes en une seule requête
4. **Export** : Export des notes en CSV/Excel
5. **Statistiques** : Ajout d'endpoints pour statistiques et graphiques

## 🎯 Conformité à l'US-06

Cette implémentation suit **exactement** la structure de l'US-06 :
- ✅ DTOs Request/Response séparés
- ✅ Validation Jakarta (@Valid, @NotNull, etc.)
- ✅ ResponseEntity pour toutes les réponses
- ✅ Gestion d'erreurs centralisée (AdviceController)
- ✅ Repository avec requêtes natives
- ✅ Service avec @Transactional
- ✅ Documentation complète

## 👥 Auteurs

Développé en suivant les standards établis par l'équipe (US-06 par soydex).
