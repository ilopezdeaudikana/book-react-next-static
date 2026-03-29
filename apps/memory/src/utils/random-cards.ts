import { Card } from '../types/models'

export const getCards = (): Card[] => {
  const numbers: number[] = [...Array(60)].map(() =>
    Math.ceil(Math.random() * 60)
  )
  
  const originalCards: Card[] = [...new Set(numbers)]
    .slice(0, 10)
    .map((n: number, index: number) => ({
      value: n,
      id: index
    }))

  const pairedCards = originalCards
    .concat(
      originalCards.map((item: Card) => {
        return {
          ...item,
          id: item.id + 61
        }
      })
    )
    .sort(() => {
      return 0.5 - Math.random()
    })
  return pairedCards
}
