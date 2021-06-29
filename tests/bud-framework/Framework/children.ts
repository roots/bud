import {Bud, Framework, setupBud, teardownBud} from '../../util'
import {config, services} from '@roots/bud'

describe('@roots/bud-framework child', () => {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    bud.children.every((k, v) => {
      bud.children.set(k, teardownBud(v))
    })
    bud = teardownBud(bud)
  })

  it("parent compiler's parent is this", () => {
    expect(bud.get().name).toBe('bud')
    expect(bud.parent.name).toBe('bud')
  })

  it('parent has no children', () => {
    expect(bud.children.all()).toEqual({})
  })

  it('bud can make a child compiler', () => {
    bud.make('child')

    expect(bud.children.has('child')).toBe(true)
  })

  it('bud can set a child compiler', () => {
    bud.set(
      'setChild',
      new Bud(config, 'setChild', bud, bud.mode).bootstrap(
        services,
      ),
    )
    const {name} = bud.get('setChild')
    expect(name).toBe('setChild')
  })

  it('child compiler can return to parent compiler via `.parent` property', () => {
    const {
      parent: {name},
    } = bud.get('child')

    expect(name).toBe('bud')
  })
})
