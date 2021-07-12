import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.provide', function () {
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
    expect(bud.provide).toBeInstanceOf(Function)
  })

  it('modifies webpack-provide-plugin options', () => {
    bud.provide({jQuery: '$'})

    expect(
      bud.hooks.filter(
        'extension/webpack-provide-plugin/options',
      ),
    ).toEqual({$: 'jQuery'})
  })

  it('modifies webpack-provide-plugin options', () => {
    bud.provide({jQuery: ['$', 'jquery']})

    expect(
      bud.hooks.filter(
        'extension/webpack-provide-plugin/options',
      ),
    ).toEqual({
      $: 'jQuery',
      jquery: 'jQuery',
    })
  })
})
