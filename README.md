# BetIQ — Guide de déploiement complet

## Structure du projet

```
betiq-app/
├── src/
│   ├── app/
│   │   ├── layout.jsx          ← Layout racine (métadonnées, PWA)
│   │   ├── page.jsx            ← Point d'entrée : onboarding → app
│   │   └── globals.css         ← Reset CSS global
│   ├── components/
│   │   ├── shared/
│   │   │   └── BetIQLogo.jsx   ← Logo SVG réutilisable
│   │   ├── onboarding/
│   │   │   └── OnboardingFlow.jsx  ← Flow inscription complet
│   │   └── app/
│   │       └── MainApp.jsx     ← Application principale (5 sections)
│   └── lib/
│       ├── data.js             ← Données, constantes, questions
│       └── styles.js           ← Tokens CSS partagés
├── public/
│   └── manifest.json           ← PWA manifest
├── .env.example                ← Variables d'env (template)
├── .gitignore
├── next.config.js
├── package.json
└── vercel.json                 ← Config déploiement Vercel
```

---

## 🚀 Déploiement en 4 étapes

### Étape 1 — Installer Node.js

Télécharge et installe Node.js LTS (v20+) :
👉 https://nodejs.org

Vérifie l'installation :
```bash
node --version   # doit afficher v20.x.x
npm --version    # doit afficher 10.x.x
```

---

### Étape 2 — Installer et lancer en local

```bash
# 1. Ouvre un terminal dans le dossier betiq-app
cd betiq-app

# 2. Installe les dépendances
npm install

# 3. Copie le fichier d'environnement
cp .env.example .env.local

# 4. Lance le serveur de développement
npm run dev
```

Ouvre ton navigateur sur : **http://localhost:3000**

L'application se recharge automatiquement à chaque modification.

---

### Étape 3 — Publier sur GitHub

```bash
# 1. Crée un compte sur https://github.com si tu n'en as pas

# 2. Crée un nouveau repository (bouton "New" sur GitHub)
#    Nom suggéré : betiq-app
#    Visibilité : Private (recommandé)

# 3. Dans le terminal, initialise git et pousse le code :
git init
git add .
git commit -m "feat: initial BetIQ app"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/betiq-app.git
git push -u origin main
```

---

### Étape 4 — Déployer sur Vercel (URL publique gratuite)

```bash
# Option A — Via l'interface web (recommandé pour débuter)
# 1. Va sur https://vercel.com
# 2. Clique "Add New Project"
# 3. Importe ton repo GitHub betiq-app
# 4. Vercel détecte automatiquement Next.js
# 5. Clique "Deploy"
# → Ton app sera en ligne en ~2 minutes sur : https://betiq-app.vercel.app

# Option B — Via la CLI
npm install -g vercel
vercel login
vercel --prod
```

**Variables d'environnement sur Vercel :**
1. Dans ton projet Vercel → Settings → Environment Variables
2. Ajoute les variables de ton `.env.local`
3. Redéploie avec `vercel --prod`

---

## 📱 Activer la PWA (installable sur mobile)

Après déploiement, sur mobile :
1. Ouvre ton URL Vercel dans Safari (iOS) ou Chrome (Android)
2. iOS : Appuie sur le bouton Partage → "Sur l'écran d'accueil"
3. Android : Menu Chrome → "Ajouter à l'écran d'accueil"

L'app s'installe comme une vraie application mobile !

---

## 🔑 APIs à configurer (par ordre de priorité)

| Service | Gratuit | Lien | Usage |
|---------|---------|------|-------|
| The Odds API | ✅ Free tier | https://the-odds-api.com | Cotes en temps réel |
| API-Football | ✅ Free tier | https://rapidapi.com/api-sports/api/api-football | Stats & matchs |
| Supabase | ✅ Free tier | https://supabase.com | Auth & base de données |
| Anthropic | 💳 Pay-as-you-go | https://console.anthropic.com | IA / résumés |
| Stripe | ✅ Gratuit jusqu'à vente | https://stripe.com | Paiements premium |

**Pour le MVP, seuls The Odds API et API-Football sont nécessaires.**

---

## 🛠️ Commandes utiles

```bash
npm run dev      # Lancer en développement (hot reload)
npm run build    # Construire pour la production
npm run start    # Lancer la version de production en local
npm run lint     # Vérifier le code

git add .        # Préparer les modifications
git commit -m "feat: description"   # Sauvegarder
git push         # Publier sur GitHub (Vercel redéploie automatiquement)
```

---

## 🔄 Flux de développement recommandé

```
Modifier du code
      ↓
npm run dev  →  voir les changements sur localhost:3000
      ↓
git add . && git commit -m "description"
      ↓
git push  →  Vercel redéploie automatiquement en production
```

---

## 🐛 Problèmes courants

**"Module not found"**
```bash
npm install   # réinstalle les dépendances
```

**"Cannot read properties of undefined"**
Vérifie que `.env.local` existe et contient les bonnes variables.

**Build échoue sur Vercel**
- Vérifie les variables d'environnement dans Vercel Settings
- Consulte les logs dans Vercel Dashboard → Deployments

**L'app ne s'affiche pas sur mobile**
- Vérifie la meta viewport dans `layout.jsx`
- Teste avec les DevTools Chrome en mode responsive

---

## 📈 Prochaines étapes après déploiement

1. **Semaine 1** : Déployer le MVP, partager l'URL
2. **Semaine 2** : Connecter The Odds API (vraies cotes)
3. **Semaine 3** : Ajouter Supabase (vrais comptes utilisateurs)
4. **Semaine 4** : Activer Stripe (paiements Pro/Elite)
5. **Mois 2** : Application native avec Expo (React Native)

---

## 💬 Support

- Documentation Next.js : https://nextjs.org/docs
- Documentation Vercel : https://vercel.com/docs
- Issues GitHub : https://github.com/TON_USERNAME/betiq-app/issues

---

*BetIQ v1.0.0 · Outil d'analyse uniquement · +18 · Jouer responsable*
*Joueurs Info Service : 09 74 75 13 13*
