import {Bud, factory} from '@roots/bud'
import {Hooks} from '@roots/bud-hooks'

describe('@roots/bud-hooks', function () {
  let bud: Bud
  let hooks: Hooks

  beforeAll(() => {
    bud = factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('is constructable', () => {
    hooks = new Hooks(bud)
    expect(hooks.app).toBeInstanceOf(Bud)
  })

  it('has an on method', () => {
    expect(hooks.on).toBeInstanceOf(Function)
  })

  it('has a filter method', () => {
    expect(hooks.filter).toBeInstanceOf(Function)
  })

  it('registers a hook', () => {
    const cb = () => 'bar'
    hooks.on('build', cb)
    expect(hooks.repository.build).toStrictEqual([cb])
  })

  it('returns expected value when filtering hook', () => {
    expect(hooks.filter('build')).toBe('bar')
  })

  it('hooks repository matches snapshot', () => {
    expect(bud.hooks.repository).toMatchSnapshot()
  })
})
