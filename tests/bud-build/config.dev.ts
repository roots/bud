import {Framework, setupBud, teardownBud} from '../util'

describe('bud.build.config', function () {
  let bud: Framework

  beforeEach(() => {
    bud = setupBud()
    bud.mode = 'development'
  })

  afterEach(() => {
    teardownBud(bud)
  })

  it('has expected mode default', () => {
    expect(bud.build.config.mode).toEqual('development')
  })

  it('has expected optimization.minimize default', () => {
    expect(bud.build.config.optimization.minimize).toEqual(false)
  })
})

export {}
