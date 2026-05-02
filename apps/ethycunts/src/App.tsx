import { useMemo, useRef, useState } from 'react'
import styles from './App.module.css'
import { MapSection } from './components/map-section/MapSection'
import { TopBar } from './components/top-bar/TopBar'
import { ErrorBoundary } from 'react-error-boundary'
import { Flex, Header, InfoPanel, Typography } from '@repo/ui'
import { navigateTo } from '@repo/utils'
import { useFiltersStore } from './store/useFiltersStore'
import { MapMode } from './types/types'
import { D3Map } from './components/d3-map/D3Map'
import { SidePanel } from './components/side-panel/SidePanel'
import { useSystemsData } from './hooks/useSystemsData'
import { systemsToGraph } from './utils/systemsToD3Grapgh'

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const mapMode = useFiltersStore((state) => state.mapMode)

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  const { systems } = useSystemsData()

  const graphData = useMemo(
    () => (systems ? systemsToGraph(systems) : { nodes: [], edges: [] }),
    [systems],
  )

  const handleNavigation = (path: string) => {
    navigateTo(path, true)
  }

  return (
    <ErrorBoundary
      fallback={<Typography variant="text">Unexpected error</Typography>}
    >
      <Header onNavigate={handleNavigation} />

      <div className={styles.page}>
        <div className={styles.layout}>
          <TopBar />

          {mapMode === MapMode.ColourCode && (
            <MapSection containerRef={containerRef} />
          )}
          {mapMode === MapMode.D3 && (
            <div className='flex h-[calc(100vh_-_15rem)] w-full overflow-hidden bg-background text-foreground'>
              <div className="w-[65%] relative bg-gray-200">
                <D3Map
                  graphData={graphData}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={setSelectedNodeId}
                />
              </div>

              <div className="w-[35%] overflow-hidden flex flex-col bg-gray-300">
                <SidePanel
                  systems={systems}
                  graphData={graphData}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={setSelectedNodeId}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <InfoPanel title="Systems map">
        <Flex vertical gap="18">
          <Typography variant="text">
            Stack: React, TypeScript, D3, Zustand, Zod, Antd, CSS Modules, Testing
            Library, Playwright
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
    </ErrorBoundary>
  )
}

export default App
