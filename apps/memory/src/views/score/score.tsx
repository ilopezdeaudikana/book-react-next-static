import { useNavigate } from 'react-router-dom'
import styles from './score.module.scss'
import { useUser } from '../../store/user.store'
import { useScore } from '../../store/score.store'

export const Score = () => {
  const navigate = useNavigate()
  const name = useUser((state) => state.name)
  const value = useScore((state) => state.value)
  const moves = useScore((state) => state.moves)

  if (!name) {
    navigate('/')
  }

  return (
    <div className="page" style={{ paddingTop: '1rem' }}>
      <button
        className="btn"
        onClick={() => {
          navigate('/game')
        }}
      >
        New Game
      </button>

      <div className="container">
        <section className={styles.score}>
          <div data-testid="congrats" className={styles.congratulations}>
            Congratulations: {name}
          </div>
          <div data-testid="score" className={styles.value}>
            Score: {value}
          </div>
          <div data-testid="moves" className={styles.value}>
            Moves: {moves / 2}
          </div>
        </section>
      </div>
    </div>
  )
}
