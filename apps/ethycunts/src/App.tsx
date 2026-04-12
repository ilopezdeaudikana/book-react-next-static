import { useRef } from 'react'
import styles from './App.module.css'
import { MapSection } from './components/map-section/MapSection'
import { TopBar } from './components/top-bar/TopBar'
import { ErrorBoundary } from 'react-error-boundary'
import { Header, InfoPanel, Typography } from '@repo/ui'
import { navigateTo } from '@repo/utils'

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const handleNavigation = (path: string) => {
    navigateTo(path, true)
  }

  return (
    <ErrorBoundary fallback={<Typography variant="text">Unexpected error</Typography>}>
      <Header onNavigate={handleNavigation} />

      <div className={styles.page}>
        <div className={styles.layout}>
          <TopBar />

          <MapSection
            containerRef={containerRef}
          />
        </div>
      </div>
      <InfoPanel title="Systems map">
        <Typography variant="text">Stack: React, TypeScript, Zustand, Zod, Antd, CSS Modules, Testing Library, Playwright</Typography>
        <Typography variant="link"
          href="https://github.com/ilopezdeaudikana/book-react-next-static/tree/main/apps/ethycunts"
          target="_blank"
        >
          See on Github
        </Typography>
      </InfoPanel>
    </ErrorBoundary>
  )
}

export default App
