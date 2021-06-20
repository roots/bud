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

    bud.override(config => [
      ...config,
      {
        ...config.pop(),
        entry: {
          app: ['foo.js'],
        },
      },
    ])

    const {entry, devtool} = bud.hooks.filter('after').pop()
    expect(entry).toEqual(expectation.entry)
    expect(devtool).toEqual(expectation.devtool)
  })
})

export {}
