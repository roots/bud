import {Bud, Framework, config, services} from '@roots/bud'

describe('bud.build.config', function () {
  let bud: Framework

  beforeEach(() => {
    bud = new Bud(config).bootstrap(services).lifecycle()
    bud.mode = 'development'
  })

  afterEach(() => {
    bud.server.watcher.close()
  })

  it('has expected mode default', () => {
    expect(bud.build.config.mode).toEqual('development')
  })

  it('has expected optimization.minimize default', () => {
    expect(bud.build.config.optimization.minimize).toEqual(false)
  })
})

export {}
