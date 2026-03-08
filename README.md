# José Manuel Puicón Rodas — Portfolio

A modern, bilingual (EN/ES) professional portfolio built with **Next.js 14**, **TypeScript**, and **TailwindCSS**. Designed for international job applications with SEO optimization, dark mode, and responsive design.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **i18n:** next-intl (English + Spanish)
- **Theme:** next-themes (Dark/Light mode)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── messages/          # i18n translation files (en.json, es.json)
├── public/            # Static assets
├── src/
│   ├── app/
│   │   ├── [locale]/  # Locale-based routing
│   │   ├── globals.css
│   │   └── sitemap.ts
│   ├── components/    # React components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── TechStack.tsx
│   │   ├── Experience.tsx
│   │   ├── Contact.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeProvider.tsx
│   ├── i18n/          # i18n configuration
│   └── middleware.ts  # Locale middleware
├── next.config.mjs
├── tailwind.config.ts
└── vercel.json
```

## How to Edit Content

All text content is managed through JSON translation files in the `messages/` directory:

- `messages/en.json` — English content
- `messages/es.json` — Spanish content

Simply edit these files to update any section text, add new projects, or modify experience details.

## How to Add Projects

1. Open `messages/en.json` and `messages/es.json`
2. Find the `projects.items` array
3. Add a new object with: `name`, `description`, `tech` (array), `github`, and `demo` fields
4. Update the `Projects.tsx` component to include the new index in the items array

## How to Update Experience

1. Open `messages/en.json` and `messages/es.json`
2. Find the `experience.items` array
3. Add or modify entries with: `company`, `location`, `role`, `period`, `description`, and `achievements`

## Deployment

This project is configured for automatic deployment on Vercel. Every push to the `main` branch triggers a new deployment.

## License

MIT
