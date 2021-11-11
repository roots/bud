import {factory, Framework} from '@roots/bud'

describe.skip('bud.provide', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({
      config: {features: {dashboard: false, log: false}},
    })
  })

  it('is a function', () => {
    expect(bud.provide).toBeInstanceOf(Function)
  })

  it('modifies webpack-provide-plugin options', () => {
    bud.provide({jQuery: ['$']})

    expect(
      bud.extensions.get('webpack-provide-plugin').options.all(),
    ).toEqual({$: ['jQuery']})
  })
})
