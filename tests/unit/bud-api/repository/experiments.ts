import {factory, Framework} from '@roots/bud'
import {join} from 'path'

describe('bud.experiments', function () {
  let bud: Framework

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

  it('enables build.config.experiments', () => {
    bud.experiments('lazyCompilation', true)

    expect(bud.hooks.filter('build.experiments')).toEqual({
      lazyCompilation: true,
    })
  })
})
