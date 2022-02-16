import {Bud, factory} from '@repo/test-kit/bud'

describe('factory', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(factory).toBeInstanceOf(Function)
  })

  it('makes a new instace of bud', () => {
    expect(bud).toBeInstanceOf(Bud)
  })
})
