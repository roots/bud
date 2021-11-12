import {factory, Framework} from '@roots/bud'

describe.skip('bud.minimize', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.minimize).toBeInstanceOf(Function)
  })

  it('enables minimizing when called', () => {
    bud.minimize()
    bud.build.make()
    expect(bud.build.config.optimization.minimize).toEqual(true)
  })

  it('disables minimizing when false is passed as param', () => {
    bud.minimize(false)
    bud.build.make()
    expect(bud.build.config.optimization.minimize).toEqual(false)
  })
})
