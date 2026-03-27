# apps/web

This app is the portfolio website for the project. Its goal is to present projects, companies, and career history in a clean browsable interface, while also offering a contact form that sends messages through SendGrid.

## App goal

The web app is designed to:

- display featured projects and project detail pages
- show companies and work history
- provide a contact page for inbound messages
- serve as the public-facing front end of the repository

## Tech used

The application currently uses:

- Next.js 16
- React 19
- TypeScript
- App Router
- Ant Design
- Redux Toolkit
- React Redux
- Sass
- SendGrid
- Vercel Analytics
- Vercel Speed Insights

## Main areas

- `app/projects`: project listing and project detail routes
- `app/companies`: company and experience listing
- `app/contact`: contact form UI
- `app/api/contact`: email submission endpoint
- `components/*`: shared UI components used across routes
- `data.js`: portfolio and company data source

## Development

From the repository root:

```bash
npm run dev
```

Or from `apps/web` directly:

```bash
npm run dev
```

The app runs on `http://localhost:3001`.
