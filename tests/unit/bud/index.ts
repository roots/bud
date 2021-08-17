import {Bud, config, factory} from '@roots/bud'

describe('factory', () => {
  let bud

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})
  })

  it('is a function', () => {
    expect(factory).toBeInstanceOf(Function)
  })

  it('makes a new instace of bud', () => {
    expect(bud).toBeInstanceOf(Bud)
  })
})
