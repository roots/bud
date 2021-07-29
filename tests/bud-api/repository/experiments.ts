import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.experiments', function () {
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
    expect(bud.experiments).toBeInstanceOf(Function)
  })

  it('enables build.config.experiments', () => {
    bud.experiments({lazyCompilation: true})

    expect(bud.hooks.filter('build/experiments')).toEqual({
      lazyCompilation: true,
    })
  })
})
