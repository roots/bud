import {config, factory, Framework} from '@roots/bud'

describe('bud.experiments', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({
      config: {...config, ci: true},
    })
  })

  it('is a function', () => {
    expect(bud.experiments).toBeInstanceOf(Function)
  })

  it('enables build.config.experiments', () => {
    bud.experiments({lazyCompilation: true})

    expect(bud.hooks.filter('build/experiments')).toEqual({
      lazyCompilation: true,
    })
  })
})
