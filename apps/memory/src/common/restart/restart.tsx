import { useNavigate } from 'react-router-dom'
import { useCards } from '../../store/cards.store'
import { useScore } from '../../store/score.store'
import { useTimer } from '../../store/timer.store'

export const Restart = () => {
  const navigate = useNavigate()
  const resetCards = useCards((state) => state.resetCards)
  const setScore = useScore((state) => state.setScore)
  const resetTimer = useTimer((state) => state.resetTimer)

  const restart = () => {
    resetCards()
    setScore({
      value: 0,
      moves: 0,
    })
    resetTimer()
    navigate('/game')
  }

  return (
    <>
      <button className="btn" onClick={restart}>
        New Game
      </button>
    </>
  )
}
