import { useEffect, useMemo, useRef, useState } from 'react'
import { MapSection } from './components/colour-map/MapSection'
import { TopBar } from './components/top-bar/TopBar'
import { ErrorBoundary } from 'react-error-boundary'
import { Flex, Header, InfoPanel, Typography } from '@repo/ui'
import { navigateTo } from '@repo/utils'
import { useFiltersStore } from './store/useFiltersStore'
import { LayoutMode, MapMode } from './types/types'
import { D3Map } from './components/d3-map/D3Map'
import { SidePanel } from './components/side-panel/SidePanel'
import { systemsByUseToGraph, systemsToGraph } from './utils/systemsToD3Graph'
import { useSystems } from './hooks/useSystems'
import { useDataStore } from './store/useDataStore'
import { addCategoriesAndUses } from './utils/addCategoriesAndUses'
import { createUsedByMap } from './utils/createUsedByMap'

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [isMobile, setIsMobile] = useState(false)

  const mapMode = useFiltersStore((state) => state.mapMode)

  const layoutMode = useFiltersStore((state) => state.layoutMode)

  const setDerivedState = useDataStore((state) => state.setDerivedState)

  const { systems, isPending, isError } = useSystems()

  const graphData = useMemo(() => {
    if (!systems) return { nodes: [], edges: [] }

    return layoutMode === LayoutMode.SystemType
      ? systemsToGraph(systems)
      : systemsByUseToGraph(systems)
  }, [systems, layoutMode])

  const handleNavigation = (path: string) => {
    navigateTo(path, true)
  }

  const mapClass = () => {
    const base = 'flex w-full overflow-hidden bg-background text-foreground'
    const height = isMobile
      ? 'h-[calc(100vh_-_6.5rem)]'
      : 'h-[calc(100vh_-_15rem)]'
    return `${base} ${height}`.trim()
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 65rem)')
    const apply = () => setIsMobile(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!isPending && !isError && systems?.length) {
      const { systemsWithMeta, allUses, allCategories } =
        addCategoriesAndUses(systems)
      const systemsMap = new Map(
        systemsWithMeta.map((system) => [system.fidesKey, system]),
      )
      const usedByMap = createUsedByMap(systems)

      setDerivedState({
        systemsMap,
        allCategories,
        usedByMap,
        allUses,
      })
    }
  }, [isPending, isError, setDerivedState, systems])

  return (
    <ErrorBoundary
      fallback={<Typography variant="text">Unexpected error</Typography>}
    >
      <div className="flex flex-col min-h-screen flex-1">
        <Header onNavigate={handleNavigation} />

        <div className="flex flex-col flex-1 gap-4">
          <div className="flex flex-1 flex-col items-stretch">
            <TopBar isMobile={isMobile} isError={isError} />

            {mapMode === MapMode.ColourCode && (
              <MapSection
                containerRef={containerRef}
                isPending={isPending}
                isError={isError}
              />
            )}
            {mapMode === MapMode.D3 && (
              <div className={mapClass()}>
                <div className="w-[65%] relative bg-gray-200">
                  <D3Map graphData={graphData} />
                </div>

                <div className="w-[35%] overflow-hidden flex flex-col bg-gray-300">
                  <SidePanel graphData={graphData} />
                </div>
              </div>
            )}
          </div>
        </div>
        <InfoPanel title="Systems map">
          <Flex vertical gap="18">
            <Typography variant="text">
              Stack: React, TypeScript, D3, Zustand, Zod, Antd, Tailwind,
              Testing Library, Playwright
            </Typography>
            <Typography
              variant="link"
              href="https://github.com/ilopezdeaudikana/book-react-next-static/tree/main/apps/ethycunts"
              target="_blank"
            >
              See on Github
            </Typography>
          </Flex>
        </InfoPanel>
      </div>
    </ErrorBoundary>
  )
}

export default App
