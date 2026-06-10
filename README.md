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
node --version   # doit afficher v20.x.x
npm --version    # doit afficher 10.x.x
# 1. Ouvre un terminal dans le dossier betiq-app
cd betiq-app

# 2. Installe les dépendances
npm install

# 3. Copie le fichier d'environnement
cp .env.example .env.local

# 4. Lance le serveur de développement
npm run dev
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
npm run dev      # Lancer en développement (hot reload)
npm run build    # Construire pour la production
npm run start    # Lancer la version de production en local
npm run lint     # Vérifier le code

git add .        # Préparer les modifications
git commit -m "feat: description"   # Sauvegarder
git push         # Publier sur GitHub (Vercel redéploie automatiquement)
Modifier du code
      ↓
npm run dev  →  voir les changements sur localhost:3000
      ↓
git add . && git commit -m "description"
      ↓
git push  →  Vercel redéploie automatiquement en production
npm install   # réinstalle les dépendances
