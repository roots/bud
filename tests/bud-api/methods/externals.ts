import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.externals', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    teardownBud(bud)
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

export {}
