import {config, factory, Framework} from '@roots/bud'

describe('bud.config', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})
  })

  it('is a function', () => {
    expect(bud.define).toBeInstanceOf(Function)
  })

  it('modifies bud.store', () => {
    bud.define({foo: 'bar'})

    expect(
      bud.extensions.get('webpack-define-plugin').options,
    ).toEqual({foo: 'bar'})
  })
})
