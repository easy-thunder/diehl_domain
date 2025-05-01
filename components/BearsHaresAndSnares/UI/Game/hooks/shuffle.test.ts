import { shuffle } from './shuffle'
import { bearCards } from '../CardData/bearCards'

describe('shuffle', () => {
  it('returns a new array, with the same cards, in a (likely) different order', () => {
    const original = [...bearCards]            // copy so we don’t accidentally mutate the import
    const shuffled = shuffle(original)
    // 1) returns a new array object
    expect(shuffled).not.toBe(original)

    // 2) still contains exactly the same cards
    expect(shuffled).toHaveLength(original.length)
    expect(new Set(shuffled)).toEqual(new Set(original))

    // 3) at least one card has moved
    const hasAtLeastOneDifferentPosition = shuffled.some(
      (card, idx) => card !== original[idx]
    )
    expect(hasAtLeastOneDifferentPosition).toBe(true)
  })
})





