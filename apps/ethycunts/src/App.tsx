import { useRef } from 'react'
import styles from './App.module.css'
import { MapSection } from './components/map-section/MapSection'
import { TopBar } from './components/top-bar/TopBar'
import { ErrorBoundary } from 'react-error-boundary'
import { Header, InfoPanel, navigateTo } from '@repo/ui'

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const handleNavigation = (path: string) => {
    navigateTo(path, true)
  }

  return (
    <ErrorBoundary fallback={<p>Unexpected error</p>}>
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
        <p>Stack: React, TypeScript, Zustand, Zod, Antd, CSS Modules, Testing Library, Playwright</p>
        <a
          href="https://github.com/ilopezdeaudikana/book-react-next-static/tree/7aa5abf620bd7c6648c2239a378dd523059c9af1/apps/ethycunts"
          target="_blank"
          rel="noopener noreferrer"
        >
          See on Github
        </a>
      </InfoPanel>
    </ErrorBoundary>
  )
}

export default App
