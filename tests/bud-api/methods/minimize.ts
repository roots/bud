import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.minimize', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
    return
  })

  afterAll(() => {
    teardownBud(bud)
    return
  })

  it('is a function', () => {
    expect(bud.minimize).toBeInstanceOf(Function)
  })

  it('enables minimizing when called', () => {
    bud.minimize()

    expect(bud.build.config.optimization.minimize).toEqual(true)
  })

  it('disables minimizing when false is passed as param', () => {
    bud.minimize(false)

    expect(bud.build.config.optimization.minimize).toEqual(false)
  })
})
