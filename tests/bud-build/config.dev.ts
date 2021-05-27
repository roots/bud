import {Bud, config, services} from '@roots/bud'

describe('bud.build.config', function () {
  beforeEach(() => {
    this.bud = new Bud(config).bootstrap(services).lifecycle()
    this.bud.mode = 'development'
  })

  it('has expected mode default', () => {
    expect(this.bud.build.config.mode).toEqual('development')
  })

  it('has expected optimization.minimize default', () => {
    expect(this.bud.build.config.optimization.minimize).toEqual(
      false,
    )
  })
})

export {}
