import {factory, Framework} from '@roots/bud'

describe('bud.build.config', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({mode: 'development', config: {ci: true}})
  })

  it('has expected mode default', () => {
    expect(bud.build.config.mode).toEqual('development')
  })

  it('has expected optimization.minimize default', () => {
    expect(bud.build.config.optimization.minimize).toEqual(false)
  })
})
