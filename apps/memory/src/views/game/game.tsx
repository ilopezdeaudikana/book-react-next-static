import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePairs, useGame } from '../../hooks'
import { Grid } from '../../common/grid/grid'
import { getCards } from '../../utils/random-cards'
import { useCards } from '../../store/cards.store'
import { useUser } from '../../store/user.store'
import { useScore } from '../../store/score.store'
import { useTimer } from '../../store/timer.store'
import { useScoreUpdate } from '../../hooks/use-score-update'
import { Restart } from '../../common/restart/restart'

export const Game = () => {
  const navigate = useNavigate()

  const list = useCards((state) => state.list)
  const setCards = useCards((state) => state.setCards)
  const name = useUser((state) => state.name)
  const moves = useScore((state) => state.moves)
  const score = useScore((state) => state.value)
  const seconds = useTimer((state) => state.seconds)

  useGame()

  useScoreUpdate()

  usePairs()

  useEffect(() => {
    if (!name) {
      navigate('/')
    }
  }, [name, navigate])

  useEffect(() => {
    const pairedCards = getCards()
    setCards(pairedCards)
  }, [setCards])

  return (
    <div className="page" style={{ paddingTop: '16px' }}>
      <Restart />
      <p>Moves: {moves % 2 === 0 ? moves : moves - 1}</p>
      <p>Time: {seconds}s</p>
      <p>Score: {score}</p>
      {list.length === 0 ? <div>...Loading</div> : <Grid list={list} />}
    </div>
  )
}
