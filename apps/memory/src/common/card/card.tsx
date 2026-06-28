import type { Card, State } from '../../types/models'
import { useDispatch, useSelector } from 'react-redux'
import styles from './card.module.scss'
import { selectCard } from '../../store/slices/cards-slice'

export const MemoryCard: React.FC<Card> = ({ id, value }) => {
  const dispatch = useDispatch()
  const { visible, paired, isAnimationOn } = useSelector(
    (state: State) => state.cards,
  )
  const isVisible = visible.find((card: Card) => card.id === id)
  const isPaired = paired.find((card: Card) => card.id === id)

  const isSelected = (!isVisible && !isPaired) ? false : true

  const baseClass = styles.card
  const showClass = ` ${styles.show}`
  const finishedClass = `${showClass} ${styles.finished}`
  const cardClass = isPaired
    ? baseClass + finishedClass
    : isVisible
      ? baseClass + showClass
      : baseClass

  const onCardSelected = () => {
    if (isSelected || isAnimationOn) {
      return
    }
    dispatch(selectCard({ id, value }))
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
