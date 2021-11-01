import {Bud, factory} from '@roots/bud'
import type {Framework} from '@roots/bud-framework'

describe('factory', () => {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(factory).toBeInstanceOf(Function)
  })

  it('makes a new instace of bud', () => {
    expect(bud).toBeInstanceOf(Bud)
  })
})
