import {factory, Framework} from '@roots/bud'

describe('@roots/bud-framework child', () => {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
  })

  it("parent compiler's name is this", () => {
    expect(bud.name).toBe('bud')
  })

  it('parent.isParent is false', () => {
    expect(bud.isParent).toBe(true)
  })

  it('parent compiler has no parent', () => {
    expect(bud.parent).toBe(null)
  })
})
