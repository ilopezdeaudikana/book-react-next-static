import { useRef } from 'react'
import styles from './App.module.css'
import { MapSection } from './components/map-section/MapSection'
import { TopBar } from './components/top-bar/TopBar'
import { ErrorBoundary } from 'react-error-boundary'

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <ErrorBoundary fallback={<p>Unexpected error</p>}>
      <div className={styles.page}>
        <div className={styles.layout}>
          <TopBar />

          <MapSection
            containerRef={containerRef}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
