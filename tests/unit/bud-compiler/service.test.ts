import {Bud, factory} from '@repo/test-kit/bud'
import {Compiler} from '@roots/bud-compiler'
import {Signale} from '@roots/bud-support'

describe('@roots/bud-compiler', function () {
  let bud: Bud
  let impl: Compiler

  beforeAll(async () => {
    bud = await factory()
    impl = new Compiler(bud)
  })

  it('has run fn', () => {
    expect(impl.compile).toBeInstanceOf(Function)
  })

  it('has logger', () => {
    expect(impl.logger).toBeInstanceOf(Signale)
  })

  it('has before fn', () => {
    expect(impl.before).toBeInstanceOf(Function)
  })

  it('has handleStats fn', () => {
    expect(impl.handleStats).toBeInstanceOf(Function)
  })

  it('has handleErrors fn', () => {
    expect(impl.handleErrors).toBeInstanceOf(Function)
  })

  it('has compile fn', () => {
    expect(impl.compile).toBeInstanceOf(Function)
  })

  it('has stats', () => {
    expect(impl.stats).toBeUndefined()
  })

  describe('prod compilation', () => {
    let prodBud: Bud

    beforeEach(async () => {
      prodBud = await factory()
    })

    afterEach(done => {
      prodBud.close(done)
    })

    it('compiles', async () => {
      const compilation = await prodBud.compiler.compile()
      expect(compilation.outputPath).toBe(prodBud.path('@dist'))
    })

    it('is a single compiler array', async () => {
      const compilation = await prodBud.compiler.compile()
      expect(compilation.compilers).toHaveLength(1)
    })
  })
})
