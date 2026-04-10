# 🎓 Design System : SKOLAE

**Tagline** : *Skill your future*
**Valeurs** : Engagement, Innovation, Agilité, Collectif
**Ton** : Professionnel, Ambitieux, Éducatif, Faisant autorité

---

## 1. Fondations (Design Tokens)

### 🎨 Palette de Couleurs

Le contraste entre le noir/blanc (autorité, minimalisme) et le vert citron (innovation, agilité) crée une identité forte. Les tons pastel adoucissent l'ensemble pour le côté éducatif et collectif.

* **Couleurs de Base (Neutres)**
* **Dark / Text Primary** : `#000000` (Noir) - *Utilisé pour les textes principaux, les titres, et les fonds de sections contrastées.*
* **Light / Background** : `#ffffff` (Blanc) - *Utilisé pour les fonds principaux de l'application et le texte sur fond sombre.*


* **Couleurs d'Accentuation (Brand)**
* **Primary Accent** : `#e2fb5f` (Vert Citron/Lime) - *Couleur d'action principale. Utilisée pour les boutons primaires, les liens au survol, et les éléments à forte mise en avant.*
* **Secondary Soft** : `#abdaee` (Bleu Clair Pastel) - *Utilisé pour les fonds de cartes, les tags, ou les zones d'information.*
* **Tertiary Soft** : `#ebc5b0` (Pêche Pastel) - *Utilisé pour les illustrations, les bannières secondaires, ou pour différencier des catégories de formations.*



### ✍️ Typographie

La combinaison de ces deux typographies reflète l'autorité (titres condensés) et la clarté moderne (corps de texte géométrique).

* **Titres (Headings) - *GT Walsheim Condensed***
* H1 (Hero) : 48px / Line-height: 1.1 / Font-weight: Bold
* H2 (Section) : 36px / Line-height: 1.2 / Font-weight: Bold
* H3 (Card Title) : 24px / Line-height: 1.3 / Font-weight: Medium


* **Corps de texte (Body) - *Basiercircle***
* Body Large (Intro) : 18px / Line-height: 1.5 / Font-weight: Regular
* Body Base (Paragraphes) : 16px / Line-height: 1.5 / Font-weight: Regular
* Body Small (Tags, Mentions légales) : 14px / Line-height: 1.4 / Font-weight: Regular



---

## 2. Composants UI (UI Kit)

### 🖱️ Boutons (Buttons)

Minimalistes avec des angles nets ou très légèrement arrondis (radius de 4px) pour le côté moderne et sérieux.

* **Primary Button** : Fond `#e2fb5f` | Texte `#000000` | Typographie : *Basiercircle Bold*. (Ex: "Postuler", "Découvrir nos campus").
* **Secondary Button** : Fond Transparent | Bordure 1px solide `#000000` | Texte `#000000`. (Ex: "En savoir plus").
* **Dark Button** : Fond `#000000` | Texte `#ffffff`. (Pour contraster sur les zones à fond clair).

### 🏷️ Tags & Badges

Utilisés pour mettre en avant les valeurs (Innovation, Agilité) ou les types de formations (Alternance, Initial).

* **Style** : Fond `#abdaee` ou `#ebc5b0` avec une opacité de 30% | Texte `#000000` | Padding de 4px 12px | *Basiercircle 14px*.

### 🃏 Cartes (Cards)

Pour afficher les campus (37 campus) ou les écoles (23 écoles).

* **Style Minimaliste** : Fond `#ffffff` | Bordure fine de 1px (`#E0E0E0`) ou Ombre portée extrêmement légère et diffuse | Hover effect : l'ombre s'intensifie légèrement et une fine ligne `#e2fb5f` apparaît en haut de la carte.

---

## 3. Directives de Layout et d'Esthétique

* **Espace Blanc (White Space)** : L'esthétique "sleek" et "minimalist" nécessite des marges généreuses (espacement en multiples de 8 : 16px, 24px, 48px, 64px) pour laisser respirer le contenu.
* **Imagerie** : Photographies professionnelles, lumineuses, mettant en scène des étudiants et des professionnels en situation de projet ("pédagogie par projet"). Éviter les banques d'images trop posées ; privilégier l'authenticité et le "Collectif".
* **Grid** : Utilisation d'une grille classique à 12 colonnes pour les écrans larges, passant à 1 colonne sur mobile.

---

## 4. Implémentation CSS (Variables Prêtes à l'Emploi)

Voici les variables CSS fondamentales que vos développeurs peuvent intégrer directement dans leur feuille de style (fichier `:root`) :

```css
:root {
  /* Colors */
  --sk-color-black: #000000;
  --sk-color-white: #ffffff;
  --sk-color-primary-lime: #e2fb5f;
  --sk-color-secondary-blue: #abdaee;
  --sk-color-tertiary-peach: #ebc5b0;

  /* Typography */
  --sk-font-heading: "GT Walsheim Condensed", sans-serif;
  --sk-font-body: "Basiercircle", sans-serif;

  /* Font Sizes */
  --sk-text-h1: 3rem;       /* 48px */
  --sk-text-h2: 2.25rem;    /* 36px */
  --sk-text-h3: 1.5rem;     /* 24px */
  --sk-text-body-lg: 1.125rem; /* 18px */
  --sk-text-body: 1rem;     /* 16px */
  --sk-text-body-sm: 0.875rem; /* 14px */

  /* Spacing */
  --sk-space-xs: 0.5rem;    /* 8px */
  --sk-space-sm: 1rem;      /* 16px */
  --sk-space-md: 1.5rem;    /* 24px */
  --sk-space-lg: 3rem;      /* 48px */
  --sk-space-xl: 4rem;      /* 64px */

  /* Borders & Shadows */
  --sk-radius-sm: 4px;
  --sk-radius-md: 8px;
  --sk-shadow-sleek: 0 4px 12px rgba(0, 0, 0, 0.05);
}

```

---

Souhaitez-vous que je vous écrive le code HTML/CSS d'un composant spécifique pour tester ce design, comme une **carte de présentation d'un campus** ou le **menu de navigation (Header)** ?