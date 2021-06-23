import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.lazy', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    teardownBud(bud)
  })

  it('is a function', () => {
    expect(bud.lazy).toBeInstanceOf(Function)
  })

  it('enables build.config.experiments.lazyCompilation', () => {
    bud.lazy()

    expect(bud.build.config.experiments.lazyCompilation).toEqual(
      true,
    )
  })
})

export {}
