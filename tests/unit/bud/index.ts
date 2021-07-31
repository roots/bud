import {Bud, factory} from '@roots/bud'

describe('factory', () => {
  it('is a function', () => {
    expect(factory).toBeInstanceOf(Function)
  })

  it('makes a new instace of bud', () => {
    expect(factory()).toBeInstanceOf(Bud)
  })
})
