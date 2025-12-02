# 🤝 Guide de Contribution - Habit Tracker

Merci de votre intérêt pour contribuer à Habit Tracker ! Ce document vous guidera à travers le processus de contribution.

## 📋 Table des Matières

1. [Code de Conduite](#code-de-conduite)
2. [Comment Contribuer](#comment-contribuer)
3. [Processus de Développement](#processus-de-développement)
4. [Standards de Code](#standards-de-code)
5. [Commit Messages](#commit-messages)
6. [Pull Requests](#pull-requests)
7. [Signaler des Bugs](#signaler-des-bugs)
8. [Suggérer des Fonctionnalités](#suggérer-des-fonctionnalités)

---

## Code de Conduite

### Notre Engagement

Nous nous engageons à offrir une expérience accueillante, inclusive et exempte de harcèlement pour tous, indépendamment de :
- L'âge, la taille, le handicap
- L'ethnicité, l'identité de genre
- Le niveau d'expérience, la nationalité
- L'apparence personnelle, la race, la religion
- L'identité ou l'orientation sexuelle

### Nos Standards

**Comportements encouragés** ✅
- Utiliser un langage accueillant et inclusif
- Respecter les points de vue différents
- Accepter les critiques constructives
- Se concentrer sur ce qui est meilleur pour la communauté
- Faire preuve d'empathie

**Comportements inacceptables** ❌
- Langage ou images à connotation sexuelle
- Trolling, commentaires insultants
- Harcèlement public ou privé
- Publier des informations privées sans permission
- Autre conduite non professionnelle

---

## Comment Contribuer

### Types de Contributions

Nous acceptons plusieurs types de contributions :

1. **🐛 Corrections de bugs**
   - Corriger des bugs existants
   - Améliorer la stabilité

2. **✨ Nouvelles fonctionnalités**
   - Implémenter des fonctionnalités de la roadmap
   - Proposer de nouvelles idées

3. **📚 Documentation**
   - Améliorer README, guides
   - Ajouter des exemples
   - Traduire la documentation

4. **🎨 Design et UX**
   - Améliorer l'interface
   - Proposer de nouvelles icônes
   - Optimiser l'expérience utilisateur

5. **🧪 Tests**
   - Ajouter des tests unitaires
   - Tests d'intégration
   - Tests E2E

6. **⚡ Performance**
   - Optimiser le code
   - Réduire la taille du bundle
   - Améliorer la vitesse

---

## Processus de Développement

### 1. Fork et Clone

```bash
# Fork le projet sur GitHub, puis :
git clone https://github.com/VOTRE_USERNAME/habit-tracker.git
cd habit-tracker
```

### 2. Installation

```bash
npm install
```

### 3. Créer une Branche

```bash
# Pour une fonctionnalité
git checkout -b feature/ma-nouvelle-fonctionnalite

# Pour un bug
git checkout -b fix/correction-du-bug

# Pour la documentation
git checkout -b docs/amelioration-readme
```

### 4. Développer

- Écrivez votre code
- Suivez les standards de code
- Ajoutez des tests si nécessaire
- Testez localement

### 5. Commit

```bash
git add .
git commit -m "feat: ajoute la fonctionnalité X"
```

### 6. Push

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

### 7. Pull Request

- Ouvrez une PR sur GitHub
- Décrivez vos changements
- Liez les issues concernées
- Attendez la review

---

## Standards de Code

### Style JavaScript/React

```javascript
// ✅ Bon
const MyComponent = ({ title, onPress }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

// ❌ Mauvais
const MyComponent = (props) => {
  var count = 0;
  
  return <View><Text>{props.title}</Text></View>;
};
```

### Conventions de Nommage

```javascript
// Composants : PascalCase
const HabitCard = () => {};

// Fonctions : camelCase
const calculateStreak = () => {};

// Constantes : UPPER_SNAKE_CASE
const MAX_HABITS = 100;

// Fichiers composants : PascalCase.js
// HomeScreen.js, HabitCard.js

// Fichiers utilitaires : camelCase.js
// statistics.js, notifications.js
```

### Structure de Fichier

```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// 2. Types/Interfaces (si TypeScript)
interface Props {
  title: string;
}

// 3. Constantes
const COLORS = {
  primary: '#4A90E2',
};

// 4. Composant
const MyComponent = ({ title }) => {
  // 4.1 Hooks
  const [state, setState] = useState();
  
  // 4.2 Functions
  const handlePress = () => {};
  
  // 4.3 Effects
  useEffect(() => {}, []);
  
  // 4.4 Render
  return <View />;
};

// 5. Styles
const styles = StyleSheet.create({});

// 6. Export
export default MyComponent;
```

### Règles de Style

- **Indentation** : 2 espaces
- **Quotes** : Simple quotes `'` pour strings
- **Semicolons** : Obligatoires `;`
- **Trailing commas** : Oui
- **Line length** : Max 100 caractères
- **Spaces** : Autour des opérateurs

### ESLint

```bash
# Vérifier le code
npm run lint

# Corriger automatiquement
npm run lint:fix
```

---

## Commit Messages

### Format

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/)

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, missing semi colons, etc
- `refactor`: Refactoring
- `perf`: Amélioration de performance
- `test`: Ajout de tests
- `chore`: Maintenance, dependencies

### Exemples

```bash
feat(habits): ajoute la possibilité d'éditer une habitude

Permet à l'utilisateur de modifier le nom, l'icône et la couleur
d'une habitude existante depuis l'écran de détails.

Closes #42
```

```bash
fix(stats): corrige le calcul du streak pour les fuseaux horaires

Le calcul du streak ne fonctionnait pas correctement pour les
utilisateurs dans des fuseaux horaires négatifs.

Fixes #38
```

```bash
docs(readme): met à jour les instructions d'installation

Ajoute des informations sur les prérequis système et clarifie
les étapes d'installation.
```

### Règles

- Utilisez l'impératif : "ajoute" pas "ajouté" ou "ajouter"
- Pas de majuscule au début
- Pas de point à la fin
- Maximum 72 caractères pour le sujet
- Référencez les issues avec `#num`

---

## Pull Requests

### Checklist PR

Avant de soumettre une PR, vérifiez que :

- [ ] Le code suit les standards établis
- [ ] Tous les tests passent
- [ ] La documentation est à jour
- [ ] Les commits sont bien formatés
- [ ] Le code a été testé localement
- [ ] Pas de conflits avec `main`
- [ ] La PR a une description claire

### Template de PR

```markdown
## Description
Décrivez vos changements en détail.

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Comment tester ?
Étapes pour reproduire et tester vos changements.

## Screenshots (si applicable)
Ajoutez des captures d'écran.

## Checklist
- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Code reviewed
```

### Processus de Review

1. **Soumission** : Vous créez la PR
2. **Review** : Un mainteneur review le code
3. **Feedback** : Des changements peuvent être demandés
4. **Approbation** : La PR est approuvée
5. **Merge** : La PR est fusionnée dans `main`

---

## Signaler des Bugs

### Avant de Signaler

1. Vérifiez que le bug n'a pas déjà été signalé
2. Assurez-vous que c'est bien un bug
3. Collectez des informations sur le bug

### Template de Bug Report

```markdown
**Description**
Description claire et concise du bug.

**Reproduction**
Étapes pour reproduire :
1. Aller à '...'
2. Cliquer sur '...'
3. Scroller jusqu'à '...'
4. Voir l'erreur

**Comportement attendu**
Ce qui devrait se passer.

**Comportement actuel**
Ce qui se passe réellement.

**Screenshots**
Si applicable, ajoutez des screenshots.

**Environnement**
- OS: [ex: iOS 16, Android 13]
- Version App: [ex: 1.0.0]
- Appareil: [ex: iPhone 14, Pixel 7]

**Informations supplémentaires**
Tout autre contexte utile.
```

---

## Suggérer des Fonctionnalités

### Template de Feature Request

```markdown
**La fonctionnalité**
Description claire de la fonctionnalité.

**Problème résolu**
Quel problème cette fonctionnalité résout-elle ?

**Solution proposée**
Comment cette fonctionnalité devrait fonctionner ?

**Alternatives considérées**
Autres solutions envisagées.

**Screenshots/Mockups**
Si vous avez des visuels.

**Informations supplémentaires**
Tout autre contexte.
```

---

## Questions ?

### Canaux de Communication

- **GitHub Issues** : Pour bugs et features
- **GitHub Discussions** : Pour questions générales
- **Email** : dev@habittracker.app (à créer)

### Délais de Réponse

- Issues : Sous 48h
- Pull Requests : Sous 1 semaine
- Questions : Sous 72h

---

## Reconnaissance

Les contributeurs seront :
- Listés dans le README
- Mentionnés dans les release notes
- Crédités dans l'app (section À propos)

---

## Ressources

### Documentation
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

### Outils Utiles
- [React DevTools](https://react-devtools-tutorial.vercel.app/)
- [Flipper](https://fbflipper.com/)
- [VS Code Extensions](https://code.visualstudio.com/docs/languages/javascript)

---

**Merci de contribuer à Habit Tracker !** 🎉

Votre aide rend ce projet meilleur pour tout le monde.
