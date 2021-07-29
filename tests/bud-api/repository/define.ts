import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.config', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
    return
  })

  afterAll(() => {
    teardownBud(bud)
    return
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
