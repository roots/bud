import {Bud, factory} from '@repo/test-kit/bud'
import Compiler from '@roots/bud-compiler'

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
})
