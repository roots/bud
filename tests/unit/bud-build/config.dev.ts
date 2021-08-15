import {Framework, setupBud} from '../../util'

describe('bud.build.config', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
    bud.mode = 'development'
  })

  it('has expected mode default', () => {
    expect(bud.build.config.mode).toEqual('development')
  })

  it('has expected optimization.minimize default', () => {
    expect(bud.build.config.optimization.minimize).toEqual(false)
  })
})

export {}
