import { matchesCaseInsensitive } from '../../src/utils/stringUtils'

describe('matchesCaseInsensitive', () => {
  it('returns true when value contains term ignoring case', () => {
    expect(matchesCaseInsensitive('Cash In - COB', 'cashin')).toBe(true)
    expect(matchesCaseInsensitive('Hello World', 'hello')).toBe(true)
    expect(matchesCaseInsensitive('Hello World', 'WORLD')).toBe(true)
  })

  it('returns true ignoring spacing and special characters', () => {
    expect(matchesCaseInsensitive('hello-world', 'helloworld')).toBe(true)
    expect(matchesCaseInsensitive('123 @React! ?', 'react')).toBe(true)
    expect(matchesCaseInsensitive('C@B-25/45', 'cb')).toBe(true)
  })

  it('returns false when term is not in value', () => {
    expect(matchesCaseInsensitive('Payment Method', 'transfer')).toBe(false)
    expect(matchesCaseInsensitive('Cash', 'cashout')).toBe(false)
  })

  it('returns false for empty value or term', () => {
    expect(matchesCaseInsensitive('', 'a')).toBe(false)
    expect(matchesCaseInsensitive('a', '')).toBe(false)
    expect(matchesCaseInsensitive('', '')).toBe(false)
  })
})
