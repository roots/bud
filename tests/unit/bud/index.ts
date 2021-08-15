import {Bud, factory} from '@roots/bud'

describe('factory', () => {
  let bud

  beforeAll(() => {
    bud = factory()
  })

  it('is a function', () => {
    expect(factory).toBeInstanceOf(Function)
  })

  it('makes a new instace of bud', () => {
    expect(bud).toBeInstanceOf(Bud)
  })
})
