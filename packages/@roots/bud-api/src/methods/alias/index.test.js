const {Bud, config, services} = require('@roots/bud')

describe('webpack.resolve.alias', () => {
  it('defaults to {}', () => {
    const instance = new Bud(config)
      .bootstrap(services)
      .lifecycle()

    expect(instance.build.config.resolve.alias).toEqual({})
  })

  it('is configurable by bud.alias', () => {
    const instance = new Bud(config)
      .bootstrap(services)
      .lifecycle()
      .alias({'@foo': 'bar'})

    expect(instance.build.config.resolve.alias).toEqual({
      '@foo': instance.path('project', 'bar'),
    })
  })
})
