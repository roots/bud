import {Bud, factory} from '@repo/test-kit/bud'
import {Compiler} from '@roots/bud-compiler'

describe(`@roots/bud-compiler`, function () {
  let bud: Bud
  let impl: Compiler

  beforeAll(async () => {
    bud = await factory()
    impl = new Compiler(bud)
  })

  it(`has run fn`, () => {
    expect(impl.compile).toBeInstanceOf(Function)
  })

  it(`has before fn`, () => {
    expect(impl.beforeCompiler).toBeInstanceOf(Function)
  })

  it(`has handleStats fn`, () => {
    expect(impl.handleStats).toBeInstanceOf(Function)
  })

  it(`has error handler`, () => {
    expect(impl.onError).toBeInstanceOf(Function)
  })

  it(`has close handler`, () => {
    expect(impl.onClose).toBeInstanceOf(Function)
  })

  it(`has compile fn`, () => {
    expect(impl.compile).toBeInstanceOf(Function)
  })

  it(`has stats`, () => {
    expect(impl.stats).toBeNull()
    expect(impl.stats).toBeNull()
  })

  describe(`prod compilation`, () => {
    let bud: Bud

    beforeEach(async () => {
      bud = await factory()
    })

    afterEach(done => {
      bud.close(done)
    })

    it(`compiles`, async () => {
      await bud.hooks.fire(`config.after`)
      const compilation = await bud.compiler.compile()
      expect(compilation.outputPath).toBe(bud.path(`@dist`))
    })

    it(`is a single compiler array`, async () => {
      await bud.hooks.fire(`config.after`)
      const compilation = await bud.compiler.compile()
      expect(compilation.compilers).toHaveLength(1)
    })
  })
})
