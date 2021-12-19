import {Bud, factory} from '@roots/bud'
import {join} from 'path'

describe('bud.experiments', function () {
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
    bud.logger.instance.scope('bud.experiments test')
  })

  it('is a function', () => {
    expect(bud.experiments).toBeInstanceOf(Function)
  })

  it('enables build.config.experiments', async () => {
    bud.experiments('lazyCompilation', true)
    await bud.build.make()

    const output = await bud.hooks.filterAsync(
      'build.experiments',
    )

    expect(output).toEqual({lazyCompilation: true})
  })
})
