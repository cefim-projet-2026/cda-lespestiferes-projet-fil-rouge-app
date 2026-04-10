# Cahier des Charges - Campus Connect

## 1. Contexte et Objectifs

**Public cible** : Enseignants, administration et étudiants d'une école d'informatique (150 étudiants actuellement, évolutif).

**Objectifs** :
1.  **Concevoir et développer** une application interactive à partir du fichier Excel existant intitulé « CDA_nn_xx Tableau de bord », actuellement utilisé pour le suivi des données et indicateurs de performance.
2.  **Créer un outil de saisie des notes** pour deux filières (Infra & Cyber, Web & Développement), en initial et en alternance, avec intégration des spécificités pédagogiques et des données existantes.

## 2. Fonctionnalités Principales

### 2.1. Gestion des Utilisateurs et des Filières
*   **Profils** : Enseignants, administration, étudiants (droits différenciés).
*   **Filières** : Distinction automatique entre les deux filières (Infra & Cyber, Web & Développement) et entre les années (1ère année en initial, alternance à partir de la 2ème année).
*   **Authentification** : Connexion sécurisée, éventuellement intégrée à l'annuaire existant.

### 2.2. Saisie des Notes
*   **Types d'évaluations** : Cas pratique, dossier, devoir sur table, QCM, projet, etc.
*   **Pondération** : 50% contrôle continu (1 à 3 évaluations par matière), 50% examen final.
*   **ECTS** : Attribution et affichage des crédits ECTS par matière.
*   **Saisie manuelle** : Possibilité d'ajouter/supprimer des matières et des types d'évaluations.
*   **Import/Export** : Compatible avec les formats CSV/Excel pour les notes et les données étudiants.

### 2.3. Intégration des Données Existantes
*   **Récupération automatique** : Nom, prénom, photo des alternants depuis le tableau de bord actuel.
*   **Synchronisation** : Mise à jour régulière des données étudiants (ajout/suppression).

### 2.4. Tableau de Bord
*   **Enseignants** : Vue par filière, année, matière, avec calcul automatique des moyennes (pondération contrôle continu/examen final).
*   **Étudiants** : Accès à leurs notes, détails des évaluations, et total d'ECTS obtenus.
*   **Administration** : Vue globale, statistiques par filière/année, export des relevés de notes.

### 2.5. Calculs et Reporting
*   **Moyennes** : Calcul automatique selon la pondération (50/50), avec affichage des ECTS validés.
*   **Alertes** : Notification pour notes manquantes, moyennes critiques, ou ECTS non validés.
*   **Relevés** : Génération de relevés de notes par semestre/année, avec détails des évaluations.

### 2.6. Évolutivité et Personnalisation
*   **Scalabilité** : Architecture adaptée à l'augmentation du nombre d'étudiants et de filières.
*   **Paramétrage** : Ajout de nouveaux types d'évaluations ou de règles de calcul.

## 3. Contraintes Techniques

### 3.1. Sécurité et Conformité
*   **RGPD** : Protection des données personnelles (photos, notes).
*   **Sauvegardes** : Automatiques et sécurisées.

### 3.2. Compatibilité
*   **Responsive** : Utilisable sur ordinateur, tablette et smartphone.
*   **Intégration** : API pour récupérer les données du tableau de bord existant.

### 3.3. Hébergement
Interne ou Cloud, à définir avec Thomas.