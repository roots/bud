import {Framework, setupBud, teardownBud} from '../util'

describe('@roots/bud-compiler', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud('development')
  })

  afterAll(() => {
    bud = teardownBud(bud)
  })

  it('is not compiled initially', () => {
    expect(bud.compiler.isCompiled).toEqual(false)
  })

  it('has run fn', () => {
    expect(bud.compiler.compile).toBeInstanceOf(Function)
  })

  it('has stats after calling compile', () => {
    bud.compiler.compile()
    expect(bud.compiler.stats).toBeDefined()
  })

  it('has a webpack compiler instance after calling compile', () => {
    bud.compiler.compile()
    expect(bud.compiler.instance).toBeDefined()
  })
})
