import {Bud, factory} from '@roots/bud'
import {join} from 'path'

describe('bud.externals', function () {
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
    expect(bud.externals).toBeInstanceOf(Function)
  })

  it('modifies build.config.externals', async () => {
    bud.externals({react: 'window.React'})
    await bud.build.make()

    expect(bud.build.config.externals).toEqual({
      react: 'window.React',
    })
  })
})
