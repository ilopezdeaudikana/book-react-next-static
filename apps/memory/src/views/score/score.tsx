import { useSelector } from 'react-redux'
import { State } from '../../types/models'
import { useNavigate } from 'react-router-dom'
import styles from './score.module.scss'

export const Score = () => {

  const navigate = useNavigate()
  const { name } = useSelector((state: State) => state.user)
  const { value } = useSelector((state: State) => state.score)

  if (!name) {
    navigate('/')
  }

  return (
    <div className='page' style={{ paddingTop: '1rem' }}>
      <button
        className='btn'
        onClick={() => {
          navigate('/game')
        }}
      >
        New Game
      </button>

      <div className='container'>
        <section className={styles.score}>
          <div data-testid='congrats' className={styles.congratulations}>
            Congratulations: {name}
          </div>
          <div data-testid='score' className={styles.value}>
            Score: {value}
          </div>
        </section>
      </div>
    </div>
  )
}
