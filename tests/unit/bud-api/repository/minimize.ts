import {Bud, factory} from '@roots/bud'
import {join} from 'path'

describe('bud.minimize', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      config: {
        features: {
          dashboard: false,
          log: false,
        },
        location: {
          project: join(process.cwd(), 'examples/sage'),
        },
      },
    })
  })

  it('is a function', () => {
    expect(bud.minimize).toBeInstanceOf(Function)
  })

  it('enables minimizing when called', async () => {
    bud.minimize()
    await bud.build.make()
    expect(bud.build.config.optimization.minimize).toEqual(true)
  })

  it('disables minimizing when false is passed as param', async () => {
    bud.minimize(false)
    await bud.build.make()
    expect(bud.build.config.optimization.minimize).toEqual(false)
  })
})
