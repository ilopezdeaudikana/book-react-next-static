# book-react-next-static

This repository contains a small Turborepo-based monorepo for a personal portfolio and project showcase site. The main goal of the project is to present professional experience, featured projects, and a contact flow in a single Next.js application while keeping the codebase organized for future growth.

## Project goal

The project is focused on:

- showcasing projects with images and technology details
- listing companies and professional experience
- providing a contact page with email delivery
- keeping the app structure simple enough to iterate on quickly

## Tech used

At the workspace level, the project uses:

- Turborepo for monorepo task orchestration
- npm workspaces for package management
- TypeScript for type safety
- ESLint for linting
- Prettier for formatting

The main application in [`apps/web`](/home/iker/dev/book-react-next-static/apps/web/README.md) uses:

- Next.js 16 with the App Router
- React 19
- Ant Design for UI components
- Redux Toolkit and React Redux for client-side state
- Sass for styling
- SendGrid for contact form email delivery
- Vercel Analytics and Speed Insights for observability

## Workspace structure

- `apps/web`: portfolio web application
- `packages/*`: shared package area for future or reusable workspace code

## Scripts

Run these commands from the repository root:

```bash
npm run dev
npm run build
npm run lint
npm run check-types
```
