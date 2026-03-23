# KinoFlow

Movie discovery application built with `React`, `TypeScript` and `Vite`, powered by the `TMDB API`.

Live site: https://kinoflow-app.vercel.app/

## Overview

KinoFlow is a client-side movie app focused on:

- browsing curated TMDB categories
- filtering and sorting movie lists
- searching movies by title
- viewing detailed movie pages
- saving favorites in `localStorage`
- switching language and theme

## Tech Stack

### Core

- `React 19`
- `TypeScript`
- `Vite`

### UI

- `MUI`
- `MUI Icons`
- `Emotion`

### State and Data Fetching

- `Redux Toolkit`
- `RTK Query`

### Routing

- `React Router`

### Internationalization

- `i18next`
- `react-i18next`

### Validation

- `Zod`

### Tooling

- `ESLint`
- `Prettier`
- `Husky`
- `lint-staged`

## Features

- Global header with navigation, theme switcher and language switcher
- TMDB logo with navigation to the home page
- Main page with random backdrop in the welcome section
- Search from the welcome section with redirect to the search page
- Category movies page with URL-based category routing and pagination
- Filtered movies page with:
  - sorting by popularity, rating, release date and title
  - rating range filter
  - multi-select genres
  - reset filters
  - URL sync for filters
- Search page with:
  - query sync in URL
  - pagination
  - clear action
  - empty and no-results states
- Favorites page backed by `localStorage`
- Movie details page with:
  - hero section
  - genres
  - rating badge
  - runtime
  - overview
  - production details
  - top cast
  - similar movies
  - back navigation
- Centralized error handling with snackbar notifications
- Response validation for API payloads via `Zod`
- Global linear loading bar
- Skeleton loaders on all data-driven pages except favorites
- Lazy-loaded routes and vendor chunk splitting for better bundle loading

## Project Structure

```text
src/
  app/                  # providers, store, global setup
  assets/               # static assets
  components/           # shared layout components
  features/             # domain features: movies, favorites
  hooks/                # reusable hooks
  pages/                # route-level pages
  router/               # router config and route prefetch
  shared/               # shared API, constants, UI, utilities
  styles/               # global styles
```

## Environment Variables

Create `.env.local` and provide:

```env
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_API_TOKEN=your_tmdb_bearer_token
```

Notes:

- `VITE_API_TOKEN` is required
- `VITE_BASE_URL` should point to TMDB v3 API

## Available Scripts

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm format
```

## Local Development

```bash
pnpm install
pnpm dev
```

Open:

```text
http://localhost:5173
```

## Production Build

```bash
pnpm build
```

The app uses:

- route-level lazy loading
- manual vendor chunk splitting in `vite.config.ts`
- prefetch for important routes on navigation hover/focus

## Deployment

The project is deployed on `Vercel`.

Production URL:

- [https://kinoflow-mipxuckjn-semenkrs-projects.vercel.app/](https://kinoflow-mipxuckjn-semenkrs-projects.vercel.app/)

For deployment, configure:

```env
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_API_TOKEN=your_tmdb_bearer_token
```

## API

Data source:

- [TMDB API](https://developer.themoviedb.org/)

Used API capabilities include:

- popular movies
- top rated movies
- upcoming movies
- now playing movies
- discover movies
- search movies
- movie details
- similar movies
- genres list

## Quality and UX

Implemented in the project:

- centralized API error handling
- snackbar-based user notifications
- typed API layer
- `Zod` schema validation for responses
- theme persistence in `localStorage`
- favorites persistence in `localStorage`
- responsive layout for desktop and mobile
- skeleton states and loading progress indicators

## Author

Semen Kr
