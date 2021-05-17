const {Bud, config, services} = require('@roots/bud')

describe('api.dev', () => {
  it('server.config.host default', () => {
    const instance = new Bud(config)
      .bootstrap(services)
      .lifecycle()

    expect(instance.build.server.config.get('host')).toEqual(
      'localhost',
    )
  })

  it('iserver.config.host default', () => {
    const instance = new Bud(config)
      .bootstrap(services)
      .lifecycle()
      .dev({host: 'bar.com'})

    expect(instance.server.config.get('host')).toEqual('bar.com')
  })
})
