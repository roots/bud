import {Bud, config, services} from '@roots/bud'

describe('webpack.resolve.alias', function () {
  beforeEach(() => {
    this.bud = new Bud(config).bootstrap(services).lifecycle()
  })

  it('is configurable by bud.alias', () => {
    this.bud.alias({'@foo': 'bar'})

    expect(this.bud.build.config.resolve.alias).toEqual({
      '@foo': this.bud.path('project', 'bar'),
    })
  })
})

export {}
