


4. **Filters In D3 Mode**
   Data use/category filters are only shown in ColourCode mode in [FilterControls.tsx]. Applying those same filters to D3 mode would make the graph mode feel like a first-class exploration tool.

5. **Saved Views / Shareable URL State**
   Persist `mapMode`, `layoutMode`, selected uses/categories, active system, and search query into the URL. The Zustand stores already centralize these values in [useFiltersStore.ts] and [useMapStore.ts], so this is a natural addition.

6. **Impact Summary Panel**
   When a system is selected, show a compact summary: number of dependencies, number of dependents, data uses involved, categories touched, and whether it bridges multiple system types. This would build on existing selection state in [useMapStore.ts].

8. **Data Quality Report**
   Since the app already validates with Zod in [types.ts], add a report for missing descriptions, unknown dependency keys, duplicate systems, systems with no privacy declarations, and unused categories.

9. **Map Legend Interactions**
   The D3 legend is currently display-only in [D3Map.tsx]. Make legend items clickable to isolate, dim, or multi-select system groups.

10. **Export Current View**
   Add export to PNG/SVG/JSON/CSV for audits or documentation. Useful exports: visible systems, selected dependency neighborhood, filtered data categories, and dependency edges.

My top three would be **Dependency Path Explorer**, **Filters In D3 Mode**, and **System Detail Drawer**. Those feel closest to the app’s real purpose: helping someone understand privacy-system relationships quickly.