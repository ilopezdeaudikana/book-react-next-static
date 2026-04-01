# Ethycunts Systems Map

A prototype that renders an interactive systems map from a JSON dataset, with filters, selection, and dependency navigation.

**Requirements**

- Convert `sample_data.json` into a format suitable for rendering. 
- Categorize systems by **System Type**.
- Display **System Name** and **Data Categories**.
- Only render the most nested subcategory (e.g., show "location" instead of "user.derived.identifiable.location").
- Implement buttons to filter the map by:
    - Data Use
    - Data Categories
- Add the ability to relayout/re-group systems by either `System Type` or `Data Use`.
- Add visual polish such as:
    * System dependency arrows.
    * Animations for filter transitions.
    * Expandable drawers for system descriptions.

**Summary**
- Filters are multi-select and the layout grouping stays stable.
- Selecting a system highlights its direct dependencies.
- Dependency panel provides scroll-to navigation.
- UI uses React + TypeScript + Vite, CSS Modules, and MUI controls.
- On smaller screens the top bar collapses into toggle buttons.
- Hello world like `e2e` tests
- Added some unit tests

**Scripts**
1. `npm run dev` – Start the dev server
2. `npm run build` – Type-check and build
3. `npm run typecheck` – Type-check only
4. `npm run preview` – Preview the production build
5. `npm run lint` – Lint
6. `npm test` – Unit tests (Vitest)
7. `npm run test:e2e` – Playwright tests

**Technologies**
- React 19 (new compiler) + TypeScript
- Vite
- Zustand
- Zod
- Material UI
- CSS Modules
- Vitest + Testing Library
- Playwright

**Design Choices**
- `useSystemsData` fetches `sample_data.json`; tests mock fetch or import directly from the data folder.
- Layout groups are derived from the full dataset, so filtering doesn’t reorder columns.
- Dependency navigation links scroll to specific cards; if the page doesn’t overflow, those links have no effect.
- CSS Modules keep styles scoped and easier to manage.
- Zustand centralizes selection/dependency state across components.

**Possible Improvements**
1. Loading/error UI for data fetch
2. Add search
3. Accessibility
4. Virtualization for large datasets
5. Persist filters in the URL
6. Theming
7. Chagne folder structure as the app grows. Distribute files per route or feature
8. Add another scroll-navigation panel for filtered items
9. Use scss
