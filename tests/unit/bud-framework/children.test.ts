import {Bud, factory} from '@repo/test-kit/bud'

describe('@roots/bud-framework child', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it("root compiler's name is this", () => {
    expect(bud.name).toBe('bud')
  })

  it('root.isRoot is false', () => {
    expect(bud.isRoot).toBe(true)
  })
})
