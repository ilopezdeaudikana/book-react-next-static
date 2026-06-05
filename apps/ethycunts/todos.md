1. **Dependency Path Explorer**
   The D3 map already highlights directly connected nodes in [D3Map.tsx]. Extend this to show full upstream/downstream paths: “What depends on this?” and “What does this depend on?” That would make the map much more useful for impact analysis.

2. **System Detail Drawer**
   The side panel has inventory search and a `DetailsPanel` entry point in [SidePanel.tsx]. A richer drawer could show description, system type, data uses, data categories, data subjects, dependencies, dependents, and related systems.

3. **Search Across All System Metadata**
   Current D3 side-panel search only checks node label and group in [SidePanel.tsx]. Expand it to search Fides key, description, data use, data category, data subject, and dependencies.

4. **Filters In D3 Mode**
   Data use/category filters are only shown in ColourCode mode in [FilterControls.tsx]. Applying those same filters to D3 mode would make the graph mode feel like a first-class exploration tool.

5. **Saved Views / Shareable URL State**
   Persist `mapMode`, `layoutMode`, selected uses/categories, active system, and search query into the URL. The Zustand stores already centralize these values in [useFiltersStore.ts] and [useMapStore.ts], so this is a natural addition.

6. **Impact Summary Panel**
   When a system is selected, show a compact summary: number of dependencies, number of dependents, data uses involved, categories touched, and whether it bridges multiple system types. This would build on existing selection state in [useMapStore.ts].

7. **Graph Controls**
   Add controls for zoom in/out, fit to screen, center selected node, freeze layout, and toggle labels. The D3 map already supports zoom and reset in [D3Map.tsx] and [D3Map.tsx].

8. **Data Quality Report**
   Since the app already validates with Zod in [types.ts], add a report for missing descriptions, unknown dependency keys, duplicate systems, systems with no privacy declarations, and unused categories.

9. **Map Legend Interactions**
   The D3 legend is currently display-only in [D3Map.tsx]. Make legend items clickable to isolate, dim, or multi-select system groups.

10. **Export Current View**
   Add export to PNG/SVG/JSON/CSV for audits or documentation. Useful exports: visible systems, selected dependency neighborhood, filtered data categories, and dependency edges.

My top three would be **Dependency Path Explorer**, **Filters In D3 Mode**, and **System Detail Drawer**. Those feel closest to the app’s real purpose: helping someone understand privacy-system relationships quickly.