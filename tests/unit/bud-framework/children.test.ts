import {Bud, factory} from '@repo/test-kit/bud'

describe('@roots/bud-framework child', () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it("root compiler's name should be `@tests/project`", () => {
    expect(bud.label).toBe('@tests/project')
  })

  it("root compiler's isRoot prop should be true", () => {
    expect(bud.isRoot).toBe(true)
  })

  it('should produce child with self at root', async () => {
    bud.make('@tests/project-child')
    await bud.hooks.fire('config.after')
    const child = bud.get('@tests/project-child')
    expect(child.root).toBe(bud)
  })

  it('should produce child with isRoot false', async () => {
    bud.make('@tests/project-child')
    await bud.hooks.fire('config.after')
    const child = bud.get('@tests/project-child')
    expect(child.isRoot).toBe(false)
  })
})
