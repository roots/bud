import {Framework, setupBud, teardownBud} from '../../util'

describe('@roots/bud-framework child', () => {
  let bud: Framework

  beforeAll(done => {
    bud = setupBud()
    done()
  })

  afterAll(done => {
    bud = teardownBud(bud)
    done()
  })

  it("parent compiler's parent is this", () => {
    expect(bud.get().name).toBe('bud')
    expect(bud.parent.name).toBe('bud')
  })

  it('parent has no children', () => {
    expect(bud.children.all()).toEqual({})
  })

  it('bud can make a child compiler', done => {
    bud.make('child')

    expect(bud.children.has('child')).toBe(true)

    done()
  })

  it('child compiler can return to parent compiler via `.parent` property', () => {
    const {
      parent: {name},
    } = bud.get('child')

    expect(name).toBe('bud')
  })
})
