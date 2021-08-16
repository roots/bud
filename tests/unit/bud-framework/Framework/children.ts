import {config, factory, Framework} from '@roots/bud'

describe('@roots/bud-framework child', () => {
  let bud: Framework

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})
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

  it('bud can make a child compiler', () => {
    bud.make('child')
    expect(bud.children.has('child')).toBe(true)
  })

  it('bud can set a child compiler', () => {
    bud.make('setChild')
    const {name} = bud.children.get('setChild')
    expect(name).toBe('setChild')
  })

  it('child compiler can return to parent compiler via `.parent` property', () => {
    const {
      parent: {name},
    } = bud.children.get('child')

    expect(name).toBe('bud')
  })
})
