<div align="center">

# 🌳 nheetree

**A lightweight, responsive Linktree clone powered by Firebase.**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge&logo=vercel)](https://nheetree-lime.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

[Demo](https://nheetree-lime.vercel.app) · [Report Bug](https://github.com/nheetxx/nheetree/issues) · [Request Feature](https://github.com/nheetxx/nheetree/issues)

</div>

---

## About

**nheetree** is a link-in-bio app in the spirit of Linktree: one page that holds all your important links. It is built with **Next.js** and **Tailwind CSS**, with **Firebase** as the backend (Authentication, Firestore, Cloud Functions, and Data Connect).

## Features

- 🔗 Manage and personalize a collection of links
- 🔐 User authentication via Firebase Authentication
- 🗄️ Data stored in Cloud Firestore, with configured **security rules** and **composite indexes**
- ⚡ Server-side logic through Firebase Cloud Functions
- 📱 Responsive, mobile-first UI (Tailwind CSS)
- 🚀 Ready to deploy on Vercel

> *Adjust this list to match what is actually implemented.*

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + PostCSS |
| Auth & Database | [Firebase Authentication](https://firebase.google.com/docs/auth), [Cloud Firestore](https://firebase.google.com/docs/firestore) |
| Backend | [Cloud Functions](https://firebase.google.com/docs/functions), [Firebase Data Connect](https://firebase.google.com/docs/data-connect) |
| Linting | ESLint |
| Hosting | [Vercel](https://vercel.com/) |

## Project Structure

```
nheetree/
├── dataconnect/            # Firebase Data Connect schema & config
├── functions/              # Firebase Cloud Functions
├── public/                 # Static assets
├── src/                    # Application source (pages, components, lib)
├── .env.example            # Environment variable template
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json  # Firestore composite indexes
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js** 18 or newer *(check the minimum version required by your Next.js version in `package.json`)*
- **npm** or **yarn**
- A **Firebase** account and the [Firebase CLI](https://firebase.google.com/docs/cli)

```bash
npm install -g firebase-tools
```

### 1. Clone & install

```bash
git clone https://github.com/nheetxx/nheetree.git
cd nheetree
npm install
```

### 2. Set up Firebase

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (choose the providers you use).
3. Create a **Cloud Firestore** database.
4. Register a **Web App** and copy its config.

### 3. Environment variables

```bash
cp .env.example .env.local
```

Fill `.env.local` with your Firebase config. Variable names follow `.env.example`, for example:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

> Never commit `.env.local`. It is already covered by `.gitignore`.

### 4. Deploy rules, indexes & functions

```bash
firebase login
firebase use <project-id>

# Firestore security rules & indexes
firebase deploy --only firestore:rules,firestore:indexes

# Cloud Functions
cd functions && npm install && cd ..
firebase deploy --only functions

# Data Connect (if used)
firebase deploy --only dataconnect
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the code with ESLint |

## Security Notes

- All data access is governed by `firestore.rules`. Review and test the rules before release.
- `NEXT_PUBLIC_*` variables are exposed to the browser. That is normal for Firebase web config, but **real security lives in your rules**, not in keeping the keys secret.
- Restrict your API key in the Google Cloud Console (HTTP referrers) and enable **App Check** where possible.
- Use the Firebase Emulator Suite for local testing:

  ```bash
  firebase emulators:start
  ```

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project on [Vercel](https://vercel.com/).
3. Add every environment variable from `.env.local` under **Project Settings → Environment Variables**.
4. Add your Vercel domain to **Authorized domains** in Firebase Authentication.
5. Deploy 🎉

## Roadmap

- [x] Core app, responsive UI, Firebase integration
- [ ] Advanced customization (themes, layouts, colors)
- [ ] Per-link click analytics
- [ ] Custom username slugs / domains
- [ ] Drag & drop link reordering

## Contributing

1. Fork this repository
2. Create a branch: `git checkout -b feat/new-feature`
3. Commit your changes: `git commit -m "feat: add new feature"`
4. Push the branch: `git push origin feat/new-feature`
5. Open a Pull Request

## License

Distributed under the **MIT License**. See the `LICENSE` file for details.

---

<div align="center">

Made with love by [@nheetxx](https://github.com/nheetxx)

⭐ If you find this useful, drop a star! ⭐

</div>