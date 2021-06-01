import {Bud, Framework, config, services} from '@roots/bud'

describe('bud.dev', function () {
  let bud: Framework

  beforeEach(() => {
    bud = new Bud(config).bootstrap(services).lifecycle()
  })

  afterEach(() => {
    bud.server.watcher.close()
  })

  it('sets host', () => {
    bud.dev({host: 'bar.com'})
    expect(bud.server.config.get('host')).toEqual('bar.com')
  })

  it('sets proxy', () => {
    bud.dev({
      proxy: {
        host: 'bar.com',
        port: 9000,
      },
    })

    expect(bud.server.config.get('proxy')).toEqual({
      host: 'bar.com',
      port: 9000,
    })
  })
})

export {}
