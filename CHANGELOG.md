# 📝 Changelog - Habit Tracker

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [1.0.0] - 2025-12-02

### 🎉 Première Version - MVP

#### ✨ Ajouté
- **Gestion des habitudes**
  - Créer une habitude avec nom, icône, couleur
  - 12 icônes disponibles
  - 12 couleurs prédéfinies
  - Fréquence quotidienne ou hebdomadaire
  - Supprimer une habitude
  
- **Suivi quotidien**
  - Marquer une habitude comme accomplie
  - Démarquer une habitude
  - Visualisation par case à cocher colorée
  
- **Statistiques**
  - Série actuelle (streak) avec badge 🔥
  - Plus longue série (record) 🏆
  - Taux de complétion sur 30 jours 📊
  - Graphique linéaire des 7 derniers jours
  - Date de création
  - Total de complétions
  - Dernière complétion

- **Interface utilisateur**
  - Écran d'accueil avec liste des habitudes
  - Écran d'ajout avec aperçu en temps réel
  - Écran de détails avec statistiques complètes
  - Écran de paramètres
  - Design moderne et épuré
  - Animations fluides
  - Responsive design

- **Stockage local**
  - Sauvegarde automatique avec AsyncStorage
  - Chargement au démarrage
  - Fonctionnement 100% hors-ligne
  - Persistance des données

- **Navigation**
  - React Navigation configuré
  - Navigation par stack
  - Modal pour l'ajout d'habitude
  - Transitions fluides

#### 📚 Documentation
- README complet avec instructions
- Guide d'utilisation détaillé (GUIDE.md)
- Documentation technique (TECHNICAL.md)
- Roadmap des futures fonctionnalités (ROADMAP.md)
- Changelog (CHANGELOG.md)

#### 🛠️ Technique
- React Native avec Expo
- Context API pour gestion d'état
- dayjs pour gestion des dates
- react-native-chart-kit pour graphiques
- TypeScript support (préparé)
- Structure modulaire et maintenable

#### 📦 Dépendances
- expo ~54.0.25
- react 19.1.0
- react-native 0.81.5
- @react-navigation/native ^7.1.22
- @react-navigation/stack ^7.6.9
- @react-native-async-storage/async-storage ^2.2.0
- dayjs ^1.11.19
- react-native-chart-kit ^6.12.0
- expo-notifications ^0.32.13

---

## [Non publié]

### 🔄 En Développement
- Système de notifications
- Édition d'habitudes existantes
- Mode sombre
- Export/Import de données

### 🐛 Corrections Prévues
- Optimisation des performances
- Amélioration de l'accessibilité
- Corrections mineures d'interface

---

## Types de Modifications

### Catégories
- **Ajouté** : nouvelles fonctionnalités
- **Modifié** : changements dans les fonctionnalités existantes
- **Déprécié** : fonctionnalités bientôt supprimées
- **Supprimé** : fonctionnalités supprimées
- **Corrigé** : corrections de bugs
- **Sécurité** : en cas de vulnérabilités

---

## Versions Futures Planifiées

### [1.1.0] - À venir
- Notifications de rappel
- Personnalisation des heures de notification
- Badges de streak spéciaux

### [1.2.0] - À venir
- Édition d'habitudes
- Plus d'icônes
- Réorganisation des habitudes

### [2.0.0] - À venir
- Mode sombre
- Thèmes personnalisables
- Refonte UI majeure

---

**Format**: [Majeur.Mineur.Patch]
- **Majeur**: Changements incompatibles avec versions précédentes
- **Mineur**: Nouvelles fonctionnalités rétrocompatibles
- **Patch**: Corrections de bugs rétrocompatibles

---

**Dernière mise à jour**: 2025-12-02
