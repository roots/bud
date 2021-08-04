import {factory} from '@roots/bud'

import {Framework, teardownBud} from '../../../util'

describe('@roots/bud-framework child', () => {
  let bud: Framework

  beforeAll(() => {
    bud = factory()
  })

  afterAll(() => {
    teardownBud(bud)
  })

  it("parent compiler's name is this", () => {
    expect(bud.name).toBe('bud')
  })

  it('parent compiler has no parent', () => {
    expect(bud.parent).toBe(null)
  })

  it('parent has no children', () => {
    expect(bud.children.all()).toEqual({})
  })

  it('bud can make a child compiler', () => {
    bud.make('child')

    expect(bud.children.has('child')).toBe(true)
  })

  it('bud can set a child compiler', () => {
    bud.children.set('setChild', factory({name: 'setChild'}))
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
