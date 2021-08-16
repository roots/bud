import {config, factory, Framework} from '@roots/bud'

describe('bud.minimize', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})
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

    expect(bud.build.rebuild().optimization.minimize).toEqual(
      false,
    )
  })
})
