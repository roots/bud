import {Bud, factory} from '@repo/test-kit/bud'

describe('@roots/bud-compiler', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('has run fn', () => {
    expect(bud.compiler.compile).toBeInstanceOf(Function)
  })

  it('has before fn', () => {
    expect(bud.compiler.before).toBeInstanceOf(Function)
  })

  it('has handleStats fn', () => {
    expect(bud.compiler.handleStats).toBeInstanceOf(Function)
  })

  it('has handleErrors fn', () => {
    expect(bud.compiler.handleErrors).toBeInstanceOf(Function)
  })

  it('has compile fn', () => {
    expect(bud.compiler.compile).toBeInstanceOf(Function)
  })
})
