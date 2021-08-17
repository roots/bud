<<<<<<< HEAD
import {Bud, config, factory, Framework} from '@roots/bud'
=======
import {Bud, config, factory} from '@roots/bud'
>>>>>>> a12648e25a952b9350f6da28f7dcccf36f39bc8c

describe('factory', () => {
  let bud: Framework

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})
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
