import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useTimer } from '../store/timer.store'
import { useCards } from '../store/cards.store'

export const useGame = () => {
  const navigate = useNavigate()

  const list = useCards((state) => state.list)
  const paired = useCards((state) => state.paired)
  const resetCards = useCards((state) => state.resetCards)

  const stopTimer = useTimer(state => state.stopTimer)
  
  useEffect(() => {
    if (!paired && !list) return
    if (paired.length > 0 && paired.length === list.length) {
      stopTimer()

      const timeout = setTimeout(() => {
        navigate('/score')
        resetCards()
      }, 500)
      return () => clearInterval(timeout)
    }
  }, [paired, list, navigate, resetCards, stopTimer])
}
