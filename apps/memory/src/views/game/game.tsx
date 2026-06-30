import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePairs, useGame } from '../../hooks'
import { Grid } from '../../common/grid/grid'
import { getCards } from '../../utils/random-cards'
import { useCards } from '../../store/cards.store'
import { useUser } from '../../store/user.store'

export const Game = () => {
  const navigate = useNavigate()
  const [newGame, setNewGame] = useState(false)

  const list = useCards((state) => state.list)
  const resetCards = useCards((state) => state.resetCards)
  const setCards = useCards((state) => state.setCards)
  const name = useUser((state) => state.name)

  useEffect(() => {
    if (!name) {
      navigate('/')
    }
  }, [name, navigate])

  useEffect(() => {
    const pairedCards = getCards()
    setCards(pairedCards)
  }, [setCards])

  usePairs()

  useGame()

  const restart = () => {
    resetCards()
    setNewGame(!newGame)
  }

  return (
    <div className="page" style={{ paddingTop: '16px' }}>
      <button className="btn" onClick={restart}>
        New Game
      </button>
      {list.length === 0 ? <div>...Loading</div> : <Grid list={list} />}
    </div>
  )
}
