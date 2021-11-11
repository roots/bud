import {factory, Framework} from '@roots/bud'

describe.skip('bud.runtime', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({
      config: {features: {dashboard: false, log: false}},
    })
  })

  it('is a function', () => {
    expect(bud.runtime).toBeInstanceOf(Function)
  })

  it('enables runtime when called', () => {
    bud.runtime({name: 'test'})

    const runtimeChunk = bud.hooks.filter(
      'build/optimization/runtimeChunk',
    )

    expect(runtimeChunk.name).toEqual(`test`)
  })

  it('can be passed a custom runtimeChunk config', () => {
    bud.runtime('single')

    expect(
      bud.hooks.filter('build/optimization/runtimeChunk'),
    ).toEqual('single')
  })

  it('disables runtimeChunk when passed a boolean false', () => {
    bud.runtime(false)

    expect(
      bud.hooks.filter('build/optimization/runtimeChunk'),
    ).toEqual(false)
  })
})
