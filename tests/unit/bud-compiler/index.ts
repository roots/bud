import {factory, Framework} from '@roots/bud'

describe('@roots/bud-compiler', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({
      config: {features: {dashboard: false, log: false}},
    })
  })

  it('is not compiled initially', () => {
    expect(bud.compiler.isCompiled).toEqual(false)
  })

  it('has run fn', () => {
    expect(bud.compiler.compile).toBeInstanceOf(Function)
  })
})
