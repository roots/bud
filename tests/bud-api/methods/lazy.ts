import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.lazy', function () {
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
    expect(bud.lazy).toBeInstanceOf(Function)
  })

  it('enables build.config.experiments.lazyCompilation', () => {
    bud.lazy()

    expect(
      bud.hooks.filter('build/experiments/lazyCompilation'),
    ).toEqual(true)
  })
})
