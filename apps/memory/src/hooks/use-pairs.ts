import { useEffect } from 'react'
import { useCards } from '../store/cards.store'

export const usePairs = () => {
  const visible = useCards((state) => state.visible)
  const resetVisibleCards = useCards((state) => state.resetVisibleCards)
  const toggleAnimation = useCards((state) => state.toggleAnimation)

  useEffect(() => {
    if (visible.length === 2 && visible[0].value !== visible[1].value) {
      toggleAnimation(true)
      const timeout = setTimeout(() => {
        resetVisibleCards()
      }, 600)
      return () => clearInterval(timeout)
    }
  }, [visible, toggleAnimation, resetVisibleCards])
}
