import {Bud, factory} from '@roots/bud'

describe.skip('bud.provide', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
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
