import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../types/models'
import { resetVisibleCards, toggleAnimation } from '../store/slices/cards-slice'

export const usePairs = () => {
  const dispatch = useDispatch()
  const { visible } = useSelector((state: State) => state.cards)

  useEffect(() => {
    if (visible.length === 2 && visible[0].value !== visible[1].value) {
      dispatch(toggleAnimation(true))
      const timeout = setTimeout(() => {
        dispatch(resetVisibleCards())
      }, 600)
      return () => clearInterval(timeout)
    }
  }, [visible, dispatch])
}
