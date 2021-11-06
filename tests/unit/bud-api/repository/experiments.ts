import {factory, Framework} from '@roots/bud'

describe.skip('bud.experiments', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
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
