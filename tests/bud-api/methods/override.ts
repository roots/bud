import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.override', function () {
  let bud: Framework

  beforeEach(() => {
    bud = setupBud()
  })

  afterEach(() => {
    teardownBud(bud)
  })

  it('is a function', () => {
    expect(bud.override).toBeInstanceOf(Function)
  })

  it('modifies value returned from after hook', () => {
    const expectation = {
      ...bud.build.config,
      entry: {
        app: ['foo.js'],
      },
    }

    bud.override(config => ({
      ...config,
      entry: {
        app: ['foo.js'],
      },
    }))

    expect(bud.hooks.filter('after').entry).toEqual(
      expectation.entry,
    )

    expect(bud.hooks.filter('after').devtool).toEqual(
      expectation.devtool,
    )
  })
})

export {}
