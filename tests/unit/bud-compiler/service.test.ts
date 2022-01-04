import {Bud, factory} from '../../util/bud'

describe('@roots/bud-compiler', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is not compiled initially', () => {
    expect(bud.compiler.isCompiled).toEqual(false)
  })

  it('has run fn', () => {
    expect(bud.compiler.compile).toBeInstanceOf(Function)
  })
})
