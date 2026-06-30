import { useEffect } from 'react'

import { useTimer } from '../store/timer.store'
import { useScore } from '../store/score.store'

export const useScoreUpdate = () => {

  const setScore = useScore(state => state.setScore)
  const moves = useScore(state => state.moves)

  const seconds = useTimer(state => state.seconds)

  useEffect(() => {
    const MAX_POSSIBLE_SCORE = 10000
    const EXTRA_MOVE_PENALTY = 250
    // Penalty per second
    const TIME_PENALTY = 25
    const MINMOVES = 10

    const extraMoves = Math.max(0, (moves / 2) - MINMOVES)

    // Deduct from the maximum potential score
    const score = MAX_POSSIBLE_SCORE - (extraMoves * EXTRA_MOVE_PENALTY) - (seconds * TIME_PENALTY)

    const finalScore = score < 100 ? 100 : Math.round(score)

    setScore({ value: finalScore })

  }, [setScore, moves, seconds])
}
