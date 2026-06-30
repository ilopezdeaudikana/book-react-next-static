import { useEffect } from 'react'
import type { DurationRef } from '../types/models'
import { useNavigate } from 'react-router-dom'
import { useInterval } from '.'
import { useCards, } from '../store/cards.store'
import { useScore } from '../store/score.store'

export const useGame = () => {
  const navigate = useNavigate()

  const list = useCards((state) => state.list)
  const paired = useCards((state) => state.paired)
  const resetCards = useCards((state) => state.resetCards)

  const setScore = useScore(state => state.setScore)
  const [durationIntervalRef, durationRef] = useInterval(
    (durationRef: DurationRef) => {
      durationRef.current++
    },
    1000,
  )
  useEffect(() => {
    if (!paired && !list) return
    if (paired.length > 0 && paired.length === list.length) {
      clearInterval(
        durationIntervalRef.current as ReturnType<typeof setInterval>
      )
      const currentDuration = durationRef ? durationRef.current : 0
      setScore({ value: Math.round((1 / (currentDuration as number)) * 10000) })

      const timeout = setTimeout(() => {
        navigate('/score')
        resetCards()
      }, 1000)
      return () => clearInterval(timeout)
    }
  }, [paired, durationIntervalRef, list, navigate, durationRef, resetCards, setScore])
}
