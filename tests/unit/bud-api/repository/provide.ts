import {factory, Framework} from '@roots/bud'

describe('bud.provide', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory()
  })

  afterAll(done => {
    bud.close(done)
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
