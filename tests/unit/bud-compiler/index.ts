import {config, factory, Framework} from '@roots/bud'

describe('@roots/bud-compiler', function () {
  let bud: Framework

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})
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
    expect(bud.compiler.instance).toBeDefined()
  })

  it('reports being compiled', () => {
    expect(bud.compiler.isCompiled).toBe(true)
  })
})
