import {Hooks} from '@roots/bud-hooks'

import {Bud, factory} from '@repo/test-kit/bud'

describe('@roots/bud-hooks', function () {
  let bud: Bud
  let hooks: Hooks

  beforeAll(async () => {
    bud = await factory()
    hooks = new Hooks(bud)
  })

  it('has an on method', () => {
    expect(hooks.on).toBeInstanceOf(Function)
  })

  it('has a filter method', () => {
    expect(hooks.filter).toBeInstanceOf(Function)
  })

  it('registers a hook', () => {
    const cb = () => 'bar'
    // @ts-ignore
    hooks.on('build', cb)

    expect(hooks.repository.build).toStrictEqual([cb])
  })

  it('returns expected value when filtering hook', () => {
    expect(hooks.filter('build')).toBe('bar')
  })

  it('hooks repository matches snapshot', () => {
    expect(hooks.repository).toMatchSnapshot()
  })
})
