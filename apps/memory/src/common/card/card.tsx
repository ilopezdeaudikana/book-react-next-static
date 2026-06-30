import { useCards } from '../../store/cards.store'
import { useScore } from '../../store/score.store'
import { useTimer } from '../../store/timer.store'
import type { Card } from '../../types/models'
import styles from './card.module.scss'

export const MemoryCard: React.FC<Card> = ({ id, value }) => {
  const visible = useCards((state) => state.visible)
  const paired = useCards((state) => state.paired)
  const isAnimationOn = useCards((state) => state.isAnimationOn)
  const selectCard = useCards((state) => state.selectCard)

  const moves = useScore((state) => state.moves)
  const setScore = useScore((state) => state.setScore)
  const startTimer = useTimer((state) => state.startTimer)

  const isVisible = visible.find((card: Card) => card.id === id)
  const isPaired = paired.find((card: Card) => card.id === id)

  const isSelected = !isVisible && !isPaired ? false : true

  const baseClass = styles.card
  const showClass = ` ${styles.show}`
  const finishedClass = `${showClass} ${styles.finished}`
  const cardClass = isPaired
    ? baseClass + finishedClass
    : isVisible
      ? baseClass + showClass
      : baseClass

  const onCardSelected = () => {
    if (moves === 0) startTimer()
    if (isSelected || isAnimationOn) {
      return
    }
    setScore({ moves: moves + 1 })
    selectCard({ id, value })
  }

  return (
    <div className={cardClass} onClick={onCardSelected}>
      <div className={styles.card_inner}>
        <div className={styles.card_front}></div>
        <div className={styles.card_back}>
          <span>{value}</span>
        </div>
      </div>
    </div>
  )
}
