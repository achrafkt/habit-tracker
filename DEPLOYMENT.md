# 🚀 Guide de Déploiement - Habit Tracker

Ce guide explique comment déployer l'application Habit Tracker sur les stores iOS et Android.

---

## 📋 Table des Matières

1. [Préparation](#préparation)
2. [Build avec EAS](#build-avec-eas)
3. [Déploiement iOS (App Store)](#déploiement-ios)
4. [Déploiement Android (Google Play)](#déploiement-android)
5. [Over-the-Air (OTA) Updates](#ota-updates)
6. [CI/CD](#cicd)

---

## 🛠️ Préparation

### 1. Créer un Compte Expo

```bash
# S'inscrire sur expo.dev
# Installer EAS CLI
npm install -g eas-cli

# Se connecter
eas login
```

### 2. Initialiser EAS

```bash
# Dans le dossier du projet
eas build:configure
```

Cela crée un fichier `eas.json` :

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 3. Mettre à Jour app.json

```json
{
  "expo": {
    "name": "Habit Tracker",
    "slug": "habit-tracker",
    "version": "1.0.0",
    "owner": "votre-username-expo",
    "ios": {
      "bundleIdentifier": "com.votreentreprise.habittracker",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.votreentreprise.habittracker",
      "versionCode": 1
    }
  }
}
```

---

## 🏗️ Build avec EAS

### Build de Développement

```bash
# Android APK (pour tests internes)
eas build --platform android --profile preview

# iOS Simulator
eas build --platform ios --profile development
```

### Build de Production

```bash
# Android (AAB pour Google Play)
eas build --platform android --profile production

# iOS (pour App Store)
eas build --platform ios --profile production

# Les deux en même temps
eas build --platform all --profile production
```

### Vérifier le Build

```bash
# Voir tous les builds
eas build:list

# Télécharger un build
eas build:download --platform android
```

---

## 📱 Déploiement iOS

### 1. Prérequis

- Compte Apple Developer (99$/an)
- Certificats et profils de provisioning
- Xcode (sur Mac)

### 2. Créer l'App sur App Store Connect

1. Aller sur [App Store Connect](https://appstoreconnect.apple.com)
2. Cliquer sur "Mes Apps" → "+"
3. Remplir :
   - Nom de l'app : "Habit Tracker"
   - Bundle ID : `com.votreentreprise.habittracker`
   - SKU : `habit-tracker-001`
   - Langue principale : Français

### 3. Préparer les Assets

**Icône de l'App** (1024x1024px)
- Format : PNG
- Pas de transparence
- Pas de coins arrondis

**Screenshots** (plusieurs tailles requises)
- iPhone 6.7" : 1290 x 2796 pixels
- iPhone 6.5" : 1242 x 2688 pixels
- iPhone 5.5" : 1242 x 2208 pixels
- iPad Pro 12.9" : 2048 x 2732 pixels

Minimum 3 screenshots par taille.

### 4. Build et Upload

```bash
# Build pour production
eas build --platform ios --profile production

# Submit à App Store
eas submit --platform ios
```

Ou manuellement :

```bash
# Télécharger le .ipa
eas build:download --platform ios --latest

# Upload avec Transporter (app macOS)
# Ou via Application Loader dans Xcode
```

### 5. Remplir les Informations

Sur App Store Connect :

**Informations de l'App**
- Catégorie : Productivité
- Sous-catégorie : Développement personnel
- Classification d'âge : 4+

**Description**
```
Habit Tracker vous aide à créer et maintenir vos habitudes quotidiennes.

✨ FONCTIONNALITÉS
• Créez des habitudes personnalisées
• Suivez votre progression quotidienne
• Visualisez vos statistiques
• Gardez votre motivation avec les séries
• Fonctionne 100% hors-ligne

📊 STATISTIQUES DÉTAILLÉES
• Série actuelle et records
• Graphiques de progression
• Taux de complétion
• Historique complet

🎨 PERSONNALISATION
• 12 icônes au choix
• 12 couleurs disponibles
• Interface moderne et intuitive

💾 VOS DONNÉES
• Sauvegarde locale automatique
• Aucun compte requis
• 100% privé et sécurisé

Commencez à améliorer votre vie dès aujourd'hui avec Habit Tracker !
```

**Mots-clés** (max 100 caractères)
```
habitudes,productivité,suivi,objectifs,motivation,routine,développement
```

**Support URL**
- Site web : https://habittracker.app (à créer)
- Email : support@habittracker.app

**Confidentialité**
- Privacy Policy URL : https://habittracker.app/privacy

### 6. Soumettre pour Review

1. Cliquer sur "Soumettre pour examen"
2. Répondre aux questions de conformité
3. Attendre la review (généralement 24-48h)

---

## 🤖 Déploiement Android

### 1. Créer un Compte Google Play Console

- Frais unique de 25$
- Inscription sur [Google Play Console](https://play.google.com/console)

### 2. Créer l'Application

1. Créer une nouvelle application
2. Remplir :
   - Nom : "Habit Tracker"
   - Langue par défaut : Français
   - Type : Application

### 3. Préparer les Assets

**Icône** (512x512px)
- Format : PNG 32 bits
- Pas de transparence

**Feature Graphic** (1024x500px)
- Bannière promotionnelle

**Screenshots**
- Téléphone : min 320px, max 3840px
- Tablette 7" : min 320px, max 3840px
- Tablette 10" : min 320px, max 3840px
- Minimum 2 screenshots, maximum 8

### 4. Générer une Keystore

```bash
# EAS gère automatiquement la keystore
# Ou créez la manuellement :
keytool -genkeypair -v -storetype PKCS12 \
  -keystore habit-tracker.keystore \
  -alias habit-tracker-key \
  -keyalg RSA -keysize 2048 -validity 10000
```

### 5. Build et Upload

```bash
# Build AAB pour production
eas build --platform android --profile production

# Submit à Google Play
eas submit --platform android
```

### 6. Remplir la Fiche du Store

**Description courte** (max 80 caractères)
```
Créez et suivez vos habitudes quotidiennes facilement
```

**Description complète** (max 4000 caractères)
```
Habit Tracker est votre compagnon idéal pour créer, suivre et maintenir 
vos habitudes quotidiennes. Simple, intuitif et puissant.

✨ FONCTIONNALITÉS PRINCIPALES

📝 CRÉEZ VOS HABITUDES
• Nommez vos habitudes personnalisées
• Choisissez parmi 12 icônes colorées
• Sélectionnez votre couleur préférée
• Définissez la fréquence (quotidienne ou hebdomadaire)

✅ SUIVEZ VOTRE PROGRESSION
• Marquez vos habitudes accomplies d'un simple tap
• Visualisez votre série de jours consécutifs
• Restez motivé avec les badges de streak
• Consultez votre historique complet

📊 STATISTIQUES DÉTAILLÉES
• Série actuelle : vos jours consécutifs
• Record personnel : votre meilleure performance
• Taux de complétion sur 30 jours
• Graphiques de progression sur 7 jours
• Informations détaillées sur chaque habitude

🎨 INTERFACE MODERNE
• Design épuré et intuitif
• Navigation fluide et rapide
• Animations agréables
• Expérience utilisateur optimale

💾 VOS DONNÉES EN SÉCURITÉ
• Sauvegarde automatique locale
• Fonctionne 100% hors-ligne
• Aucun compte nécessaire
• Données privées et sécurisées
• Pas de collecte d'informations personnelles

🚀 POURQUOI HABIT TRACKER ?

Simple : Créez une habitude en quelques secondes
Motivant : Les séries vous encouragent à continuer
Complet : Statistiques détaillées de votre progression
Privé : Vos données restent sur votre appareil
Gratuit : Toutes les fonctionnalités sans publicité

🎯 PARFAIT POUR

• Développer de nouvelles habitudes saines
• Maintenir une routine quotidienne
• Atteindre vos objectifs personnels
• Améliorer votre productivité
• Suivre votre développement personnel

Commencez votre transformation dès aujourd'hui avec Habit Tracker !
```

### 7. Classification du Contenu

- Public cible : Tous
- Annonces : Non
- Achats intégrés : Non
- Contenu sensible : Non

### 8. Lancer en Production

1. Créer une version (Production)
2. Upload l'AAB
3. Remplir la description de version
4. Soumettre pour examen
5. Attendre l'approbation (généralement quelques heures à 1 jour)

---

## 🔄 OTA Updates

### Configuration

Les mises à jour OTA permettent de déployer des changements sans passer par les stores.

```bash
# Publier une mise à jour
eas update --branch production --message "Fix bug calculation"

# Vérifier les updates
eas update:list
```

### Limitations

⚠️ **Ne peut pas modifier** :
- Code natif (plugins Expo)
- Dépendances natives
- app.json (certains champs)

✅ **Peut modifier** :
- JavaScript/TypeScript
- Assets (images, fonts)
- Styles

---

## 🔁 CI/CD

### GitHub Actions

Créer `.github/workflows/build.yml` :

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build Android
        run: eas build --platform android --non-interactive --no-wait
        
      - name: Build iOS
        run: eas build --platform ios --non-interactive --no-wait
```

### Variables d'Environnement

Dans GitHub Settings → Secrets :
- `EXPO_TOKEN` : Token d'authentification Expo
- `GOOGLE_SERVICE_ACCOUNT_KEY` : Pour Google Play
- `APPLE_API_KEY` : Pour App Store

---

## 📊 Monitoring

### Analytics

Intégrer Firebase Analytics :

```bash
npx expo install @react-native-firebase/analytics
```

### Crash Reporting

Utiliser Sentry :

```bash
npx expo install @sentry/react-native
```

### Performance

Monitorer avec :
- Firebase Performance
- Expo Application Services
- New Relic (optionnel)

---

## ✅ Checklist de Déploiement

### Avant le Build

- [ ] Version incrémentée dans app.json
- [ ] Changelog à jour
- [ ] Tests passent
- [ ] Code review complété
- [ ] Assets optimisés
- [ ] Notifications configurées
- [ ] Privacy policy créée
- [ ] Terms of service créés

### Build

- [ ] Build iOS production réussi
- [ ] Build Android production réussi
- [ ] Installé et testé sur vrais appareils
- [ ] Performance vérifiée
- [ ] Pas de crash

### Store

- [ ] Screenshots uploadés
- [ ] Descriptions complétées
- [ ] Mots-clés optimisés
- [ ] Privacy policy liée
- [ ] Support URL configurée
- [ ] Classification d'âge correcte

### Post-Déploiement

- [ ] Monitoring activé
- [ ] Analytics configurés
- [ ] Crash reporting actif
- [ ] Support email fonctionnel
- [ ] Feedback collecté

---

## 🆘 Dépannage

### Build Failed

```bash
# Nettoyer le cache
eas build:clear-cache

# Recréer eas.json
rm eas.json
eas build:configure
```

### Signature Issues (iOS)

```bash
# Régénérer les certificats
eas credentials

# Supprimer et recréer
eas credentials:delete
```

### Upload Failed

```bash
# Vérifier la taille du bundle
eas build:inspect

# Optimiser si nécessaire
```

---

## 📚 Ressources

- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policies](https://play.google.com/console/about/guides/policycompliance/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)

---

**Bonne chance pour votre déploiement !** 🚀
