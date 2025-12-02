# 📱 Habit Tracker

Une application mobile React Native pour créer, suivre et maintenir vos habitudes quotidiennes.

## 🎯 Fonctionnalités

### ✨ Gestion des Habitudes
- **Créer des habitudes** avec nom, icône, couleur personnalisée
- **Fréquence flexible** : quotidienne ou hebdomadaire
- **Marquer comme accomplie** chaque jour
- **Supprimer des habitudes** facilement

### 📊 Suivi et Statistiques
- **Série actuelle (Streak)** : jours consécutifs d'accomplissement
- **Record personnel** : plus longue série de jours
- **Taux de complétion** : pourcentage sur 30 jours
- **Graphique de progression** : visualisation des 7 derniers jours
- **Historique complet** de toutes les complétions

### 🎨 Interface Moderne
- **Design épuré** et intuitif
- **Animations fluides**
- **Mode sombre** (à venir)
- **Navigation simple** entre les écrans

### 💾 Stockage Local
- **Sauvegarde automatique** avec AsyncStorage
- **Fonctionne hors-ligne** entièrement
- **Données persistantes** entre les sessions

## 🛠️ Technologies Utilisées

- **React Native** - Framework mobile
- **Expo** - Plateforme de développement
- **React Navigation** - Navigation entre écrans
- **Context API** - Gestion d'état globale
- **AsyncStorage** - Stockage local des données
- **dayjs** - Gestion des dates
- **react-native-chart-kit** - Graphiques et visualisations
- **Expo Notifications** - Système de rappels

## 📦 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn
- Expo CLI
- Expo Go app (sur votre téléphone) ou émulateur Android/iOS

### Étapes d'installation

1. **Cloner le projet**
```bash
cd habit-tracker
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer l'application**
```bash
npm start
```

4. **Tester sur votre appareil**
- Scannez le QR code avec l'app Expo Go (Android)
- Scannez avec l'appareil photo (iOS)

Ou utilisez les commandes :
```bash
npm run android  # Pour Android
npm run ios      # Pour iOS (Mac uniquement)
npm run web      # Pour navigateur web
```

## 📱 Écrans de l'Application

### 🏠 Écran d'Accueil
- Liste de toutes les habitudes
- Case à cocher pour marquer comme accomplie
- Badge de série (streak) pour chaque habitude
- Bouton flottant pour ajouter une nouvelle habitude
- Accès aux paramètres

### ➕ Écran d'Ajout
- Champ de saisie du nom
- Sélection d'icône (12 options)
- Choix de couleur (12 couleurs)
- Fréquence (quotidienne/hebdomadaire)
- Aperçu en temps réel

### 📈 Écran de Détails
- En-tête coloré avec icône et nom
- 3 cartes de statistiques :
  - Série actuelle 🔥
  - Record personnel 🏆
  - Taux de complétion 📊
- Graphique linéaire des 7 derniers jours
- Informations détaillées :
  - Date de création
  - Total de complétions
  - Dernière complétion
- Bouton de suppression

### ⚙️ Écran de Paramètres
- Notifications (à venir)
- Thème (à venir)
- Export/Import de données (à venir)
- Effacer toutes les données
- À propos

## 🎨 Personnalisation

### Icônes Disponibles
⭐ 💪 📚 🏃 💧 🧘 🎯 ✍️ 🎨 🎵 🌱 💼

### Couleurs Disponibles
- Bleu (#4A90E2)
- Rouge (#E94B3C)
- Vert (#50C878)
- Orange (#FFB347)
- Violet (#9B59B6)
- Turquoise (#1ABC9C)
- Orange foncé (#E67E22)
- Bleu clair (#3498DB)
- Rose (#E91E63)
- Cyan (#00BCD4)
- Rouge orangé (#FF5722)
- Marron (#795548)

## 📊 Structure du Projet

```
habit-tracker/
├── src/
│   ├── contexts/
│   │   └── HabitContext.js      # Gestion d'état globale
│   ├── navigation/
│   │   └── AppNavigator.js      # Configuration navigation
│   └── screens/
│       ├── HomeScreen.js        # Écran d'accueil
│       ├── AddHabitScreen.js    # Ajout d'habitude
│       ├── DetailsScreen.js     # Détails et stats
│       └── SettingsScreen.js    # Paramètres
├── App.js                        # Point d'entrée
├── app.json                      # Configuration Expo
└── package.json                  # Dépendances
```

## 🔧 Fonctionnalités à Venir

- [ ] Notifications de rappel quotidiennes
- [ ] Mode sombre
- [ ] Export/Import des données
- [ ] Widgets pour l'écran d'accueil
- [ ] Statistiques avancées
- [ ] Catégories d'habitudes
- [ ] Objectifs personnalisés
- [ ] Partage de progression
- [ ] Synchronisation cloud

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Développé avec ❤️ avec React Native

## 🙏 Remerciements

- React Native Community
- Expo Team
- Tous les contributeurs open-source

---

**Note** : Cette application fonctionne entièrement hors-ligne et ne nécessite aucune connexion internet après l'installation initiale.
