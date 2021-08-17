import {config, factory, Framework} from '@roots/bud'

describe('bud.externals', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({
      config: {...config, ci: true},
    })
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is a function', () => {
    expect(bud.externals).toBeInstanceOf(Function)
  })

  it('modifies build.config.externals', () => {
    bud.externals({react: 'window.React'})

    expect(bud.build.config.externals).toEqual({
      react: 'window.React',
    })
  })
})
