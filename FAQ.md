# ❓ FAQ - Habit Tracker

Questions fréquemment posées sur l'application Habit Tracker.

---

## 📱 Général

### Qu'est-ce que Habit Tracker ?

Habit Tracker est une application mobile qui vous aide à créer, suivre et maintenir vos habitudes quotidiennes. Elle vous permet de visualiser votre progression, de rester motivé avec des séries de jours consécutifs, et d'analyser vos statistiques.

### L'application est-elle gratuite ?

Oui, Habit Tracker est 100% gratuite et sans publicité.

### Sur quelles plateformes est-elle disponible ?

- ✅ iOS (iPhone et iPad)
- ✅ Android
- 🔄 Web (en développement)

### Faut-il créer un compte ?

Non ! L'application fonctionne entièrement hors-ligne sans besoin de compte ou de connexion.

### L'application nécessite-t-elle une connexion internet ?

Non. Habit Tracker fonctionne 100% hors-ligne. Vos données sont stockées localement sur votre appareil.

---

## 🎯 Utilisation

### Comment créer une habitude ?

1. Sur l'écran d'accueil, appuyez sur le bouton **+** en bas à droite
2. Entrez le nom de votre habitude
3. Choisissez une icône et une couleur
4. Sélectionnez la fréquence (quotidienne ou hebdomadaire)
5. Appuyez sur "Sauver"

### Comment marquer une habitude comme accomplie ?

Sur l'écran d'accueil, appuyez simplement sur la case à cocher à gauche de l'habitude. Une coche verte apparaîtra.

### Puis-je démarquer une habitude ?

Oui ! Appuyez à nouveau sur la case cochée pour retirer la complétion du jour.

### Comment supprimer une habitude ?

1. Appuyez sur l'habitude pour ouvrir l'écran de détails
2. Appuyez sur l'icône 🗑️ en haut à droite
3. Confirmez la suppression

⚠️ **Attention** : Cette action est irréversible !

### Puis-je modifier une habitude après l'avoir créée ?

Pas encore, mais cette fonctionnalité arrive dans la version 1.2. Pour le moment, vous devez supprimer et recréer l'habitude.

### Combien d'habitudes puis-je créer ?

Il n'y a pas de limite ! Mais nous recommandons de commencer avec 3-5 habitudes pour rester gérable.

---

## 📊 Statistiques

### Qu'est-ce qu'une "série" (streak) ?

Une série est le nombre de jours consécutifs où vous avez accompli une habitude. Par exemple, si vous méditez tous les jours pendant 7 jours, votre série est de 7.

### Comment la série est-elle calculée ?

La série compte les jours consécutifs en partant d'aujourd'hui (ou hier si vous n'avez pas encore complété aujourd'hui) et remonte dans le temps.

**Exemple** :
- Lundi ✅, Mardi ✅, Mercredi ✅ → Série = 3
- Lundi ✅, Mardi ❌, Mercredi ✅ → Série = 1

### Que se passe-t-il si je manque un jour ?

Votre série actuelle se réinitialise à 0. Cependant, votre **record** (plus longue série) et votre **historique** sont conservés.

### Qu'est-ce que le "record" ?

C'est votre plus longue série de tous les temps pour cette habitude. Il ne diminue jamais, même si vous manquez des jours.

### Comment est calculé le taux de complétion ?

Le taux de complétion est le pourcentage de jours où vous avez accompli l'habitude sur les 30 derniers jours.

**Formule** : (Jours complétés / 30) × 100

**Exemple** : Si vous avez complété 21 jours sur 30 → 70%

### Puis-je voir mon historique complet ?

Oui ! Sur l'écran de détails, vous pouvez voir :
- Le graphique des 7 derniers jours
- Le total de complétions depuis la création
- La date de dernière complétion

Un calendrier complet arrivera dans une future version.

---

## 💾 Données et Sauvegarde

### Où sont stockées mes données ?

Vos données sont stockées localement sur votre appareil avec AsyncStorage (technologie React Native).

### Mes données sont-elles sauvegardées automatiquement ?

Oui ! Chaque modification est sauvegardée instantanément et automatiquement.

### Puis-je perdre mes données ?

Vos données sont persistantes et survivent à la fermeture de l'app. Cependant, elles peuvent être perdues si :
- Vous désinstallez l'application
- Vous effacez le cache/données de l'app dans les paramètres système
- Vous utilisez "Effacer toutes les données" dans les paramètres

### Comment sauvegarder mes données ?

La fonctionnalité d'export/backup arrivera dans la version 2.1. Pour le moment, assurez-vous de ne pas désinstaller l'app.

### Puis-je synchroniser mes données entre appareils ?

Pas encore. La synchronisation cloud est prévue pour une future version (2.1+).

### Comment exporter mes données ?

Cette fonctionnalité n'est pas encore disponible, mais elle arrivera bientôt avec :
- Export JSON
- Export CSV
- Backup automatique

---

## 🔒 Confidentialité et Sécurité

### Mes données sont-elles sécurisées ?

Oui ! Vos données :
- ✅ Restent sur votre appareil uniquement
- ✅ Ne sont jamais envoyées à des serveurs externes
- ✅ Ne sont pas partagées avec des tiers
- ✅ Ne nécessitent pas de compte

### L'application collecte-t-elle des données personnelles ?

Non. Aucune donnée personnelle n'est collectée, stockée ou partagée.

### L'application utilise-t-elle des trackers ?

Non. Aucun tracker publicitaire ou analytique n'est utilisé dans la version 1.0.

### Puis-je supprimer mes données ?

Oui ! Dans les paramètres, vous pouvez :
- Supprimer des habitudes individuelles
- Effacer toutes les données d'un coup

---

## 🔔 Notifications

### Comment activer les notifications ?

Les notifications ne sont pas encore disponibles dans la version 1.0. Elles arriveront dans la version 1.1.

### Puis-je choisir l'heure des rappels ?

Oui, cette fonctionnalité sera disponible dans la version 1.1 avec :
- Personnalisation de l'heure par habitude
- Plusieurs rappels par jour (optionnel)
- Rappels intelligents

---

## 🎨 Personnalisation

### Combien d'icônes sont disponibles ?

12 icônes sont disponibles dans la version 1.0 :
⭐ 💪 📚 🏃 💧 🧘 🎯 ✍️ 🎨 🎵 🌱 💼

Plus d'icônes seront ajoutées dans les futures versions.

### Combien de couleurs puis-je choisir ?

12 couleurs sont disponibles, allant du bleu au rouge en passant par le vert, l'orange, le violet, etc.

### Puis-je créer mes propres icônes/couleurs ?

Pas dans la version actuelle. Cette fonctionnalité est prévue pour la version 1.2+.

### Y a-t-il un mode sombre ?

Pas encore ! Le mode sombre est prévu pour la version 2.0 avec :
- Thème automatique (système)
- Mode clair/sombre manuel
- Thèmes personnalisables

---

## ⚙️ Technique

### Quelle version d'iOS est requise ?

iOS 13.0 ou supérieur.

### Quelle version d'Android est requise ?

Android 5.0 (API 21) ou supérieur.

### L'application fonctionne-t-elle sur tablette ?

Oui ! L'application est responsive et fonctionne sur :
- iPhone
- iPad
- Tablettes Android

### Quelle est la taille de l'application ?

Environ 20-30 MB selon la plateforme.

### L'application consomme-t-elle beaucoup de batterie ?

Non. L'application est optimisée et ne consomme pratiquement pas de batterie.

---

## 🐛 Problèmes et Bugs

### L'application ne sauvegarde pas mes habitudes

**Solutions** :
1. Vérifiez que vous avez accordé les permissions de stockage
2. Assurez-vous d'avoir de l'espace de stockage disponible
3. Essayez de redémarrer l'application
4. Réinstallez l'application (⚠️ vous perdrez vos données)

### Mes statistiques sont incorrectes

**Solutions** :
1. Vérifiez que la date/heure de votre appareil est correcte
2. Redémarrez l'application
3. Signalez le bug sur GitHub

### Le graphique ne s'affiche pas

**Solutions** :
1. Assurez-vous d'avoir au moins une complétion
2. Redémarrez l'application
3. Vérifiez la mise à jour de l'app

### L'application plante au démarrage

**Solutions** :
1. Redémarrez votre appareil
2. Réinstallez l'application
3. Vérifiez les mises à jour système
4. Contactez le support

### Comment signaler un bug ?

Ouvrez une issue sur GitHub :
https://github.com/yourusername/habit-tracker/issues

Incluez :
- Description du bug
- Étapes pour reproduire
- Capture d'écran
- Version de l'app et de l'OS

---

## 🆕 Fonctionnalités Futures

### Quand la prochaine version sort-elle ?

Consultez la [Roadmap](ROADMAP.md) pour les dates prévues.

### Comment suggérer une fonctionnalité ?

Ouvrez une "Feature Request" sur GitHub :
https://github.com/yourusername/habit-tracker/issues/new

### Puis-je contribuer au développement ?

Absolument ! Consultez le [Guide de Contribution](CONTRIBUTING.md).

### L'application sera-t-elle toujours gratuite ?

Oui ! L'application restera gratuite. Une version "Premium" avec des fonctionnalités avancées pourrait être proposée dans le futur, mais les fonctionnalités de base resteront gratuites.

---

## 📞 Support

### Comment contacter le support ?

- 📧 Email : support@habittracker.app (à créer)
- 💬 GitHub Discussions : [Lien](https://github.com/yourusername/habit-tracker/discussions)
- 🐛 GitHub Issues : [Lien](https://github.com/yourusername/habit-tracker/issues)

### Délai de réponse ?

Généralement sous 48-72 heures.

### Y a-t-il une communauté ?

Oui ! Rejoignez-nous sur :
- GitHub Discussions
- Discord (à venir)
- Reddit (à venir)

---

## 💡 Conseils et Astuces

### Comment rester motivé ?

1. **Commencez petit** : 2-3 habitudes maximum
2. **Soyez spécifique** : "Méditer 10 minutes" plutôt que "Méditer"
3. **Ne cassez pas la chaîne** : Le streak est motivant !
4. **Célébrez vos victoires** : Consultez vos stats régulièrement
5. **Soyez patient** : Les habitudes prennent du temps

### Meilleures pratiques

✅ **À faire** :
- Marquer les habitudes juste après les avoir faites
- Vérifier vos stats régulièrement pour rester motivé
- Commencer avec des habitudes faciles
- Être cohérent chaque jour

❌ **À éviter** :
- Créer trop d'habitudes en même temps
- Être trop vague ("Être productif")
- Se décourager après un jour manqué
- Oublier de marquer les complétions

### Exemples d'habitudes populaires

**Santé** 💪
- Faire 30 minutes d'exercice
- Boire 2L d'eau
- Dormir 8 heures
- Méditer 10 minutes

**Productivité** 📚
- Lire 20 pages
- Écrire 500 mots
- Apprendre 10 nouveaux mots
- Travailler sur un projet personnel

**Bien-être** 🧘
- Méditer 10 minutes
- Tenir un journal
- Pratiquer la gratitude
- Pas d'écran 1h avant le coucher

---

## 🎓 Ressources

### Documentation
- [Guide d'Utilisation](GUIDE.md)
- [Documentation Technique](TECHNICAL.md)
- [Exemples de Code](EXAMPLES.md)
- [Roadmap](ROADMAP.md)

### Articles sur les Habitudes
- "Atomic Habits" par James Clear
- "The Power of Habit" par Charles Duhigg
- "Tiny Habits" par BJ Fogg

### Applications Complémentaires
- Calendrier pour planification
- Notes pour journal
- Minuteur pour méditation

---

**Des questions non listées ici ?**

Consultez la [documentation complète](GUIDE.md) ou contactez le support !

---

**Dernière mise à jour** : Décembre 2025
**Version** : 1.0.0
