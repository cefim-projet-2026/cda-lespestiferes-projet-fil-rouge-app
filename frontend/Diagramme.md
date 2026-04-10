Analyse du besoin
V1 (V2 en dessous)
Entités candidates :
Utilisateurs (Base commune)
Nom
Prénom
Adresse e-mail
Mot de passe
Rôle (Responsable pédagogique, Formateur, Élève)
Élève (Spécifique)
Adresse postale
Moyenne générale
Statut (Initial / Alternant)
Formateur (Spécifique)
Statut activité (Actif / Désactivé)
Structure Pédagogique (Filière / Promotion / Classe)
Nom de la filière (ex: ESGI / 2I)
Nom de la promotion
Nom de la classe
Année scolaire
Matières
Nom de la matière
Crédits ECTS
Évaluations
Type d’évaluation (QCM, TP, Restitution, Devoir sur table, Autre)
Catégorie (Contrôle Continu ou Partiel)
Coefficient
Date évaluation
Semestre / Trimestre
Notes
Valeur de la note (2 décimales)
Commentaire individuel
Statut présence (Présent / Absence injustifiée / Absence justifiée)
Règles de gestion :
Gestion des Utilisateurs et Droits
Hiérarchie : Le Responsable Pédagogique (RP) possède les droits d'administrateur et gère les élèves et les formateurs.
Inscription : Il n'y a pas d'inscription publique, les comptes sont créés de manière interne (seulement connexion possible).
Désactivation : Un formateur ne peut pas être supprimé de la base de données, mais peut être "désactivé" par le RP.
Modification données : Un élève peut modifier ses informations personnelles (adresse, mail), mais pas ses notes.
Gestion des Notes et Évaluations
Calcul de moyenne : La note finale d'une matière est composée à 50% du Contrôle Continu et 50% du Partiel.
Saisie : Les formateurs saisissent les notes uniquement pour leurs matières.
Modification des notes : Les formateurs peuvent modifier leurs propres notes. Au-delà du trimestre/semestre, seul le RP peut modifier une note.
Validation : Les crédits ECTS d'une matière sont validés si la moyenne est supérieure à 10.
Coefficients : Les types d'évaluation n'ont pas de coefficient fixe, mais toutes les matières se valent en termes de coefficient.
Absences : Une absence justifiée, ou injustifiée équivaut actuellement à la note de 0.
Visibilité
Étudiant : Un étudiant ne peut consulter que ses propres notes.
Formateur : Un formateur peut voir les notes des élèves de la classe où il intervient, toutes matières confondues.
Relations :
Relation entre Structure Pédagogique et Élève : Une classe contient plusieurs élèves, un élève appartient à une seule classe (pour une période donnée). (1,n) ou (1,1).
Relation entre Formateur et Matière : Un formateur peut enseigner plusieurs matières et ajouter une matière s'il elle n'existe pas. (1,n) .
Relation entre Matière et Évaluation : Une matière peut avoir plusieurs évaluations (plusieurs notes possibles en contrôle continu), une évaluation concerne une seule matière. (1,n) .
Relation entre Évaluation et Note : Une évaluation génère plusieurs notes (une par élève présent), une note est liée à une seule évaluation spécifique. (1,n).
Relation entre Élève et Note : Un élève reçoit plusieurs notes, mais une note appartient à un seul élève unique. (1,n).
Relation entre Formateur et Classe : Un formateur intervient dans une ou plusieurs classes. (n,n).
V2

Acteurs :
·       Utilisateurs (Base commune)
·       Élève (Spécifique)
·       Formateur (Spécifique)
·       Responsable Pédagogique (Spécifique)
 
Fonctionnalités :
Utilisateurs :
·       Accéder à l’application
Élève :
·       Consulter ses notes
Formateur :
·       Saisir les notes pour ses élèves
·       Consulter les notes de ses élèves
Responsable Pédagogique :
·       Gérer les filières, classes, formateurs et élèves
·       Importer des fichiers de notes
·       Création de comptes
Automatique :
·       Calcul de Moyenne selon les règles du CEFIM (50% du Contrôle Continu et 50% du Partiel)
·       Validation des ECTS pour un élève si la moyenne est supérieure à 10
·       Gestion de coefficients (toutes les matières sont égales)
·       Gestion des absence (note de 0)

Limites du système :
Uniquement de la gestion de note.
Utilisable seulement par les personnes du campus de Tours.
Ne continent qu’une seule « grosse » fonctionnalité (la saisie de note).
Ne communique pas avec d’autres applications.