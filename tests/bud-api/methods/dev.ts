import {Bud, config, services} from '@roots/bud'

describe('bud.dev', function () {
  beforeEach(() => {
    this.bud = new Bud(config).bootstrap(services).lifecycle()
  })

  it('sets host', () => {
    this.bud.dev({host: 'bar.com'})
    expect(this.bud.server.config.get('host')).toEqual('bar.com')
  })

  it('sets proxy', () => {
    this.bud.dev({
      proxy: {
        host: 'bar.com',
        port: 9000,
      },
    })

    expect(this.bud.server.config.get('proxy')).toEqual({
      host: 'bar.com',
      port: 9000,
    })
  })
})

export {}
