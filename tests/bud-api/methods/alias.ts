import {Bud, Framework, config, services} from '@roots/bud'

describe('webpack.resolve.alias', function () {
  let bud: Framework

  beforeEach(() => {
    bud = new Bud(config).bootstrap(services).lifecycle()
  })

  afterEach(() => {
    bud.server.watcher.close()
  })

  it('is configurable by bud.alias', () => {
    bud.alias({'@foo': 'bar'})

    expect(bud.build.config.resolve.alias).toEqual({
      '@foo': bud.path('project', 'bar'),
    })
  })
})

export {}
