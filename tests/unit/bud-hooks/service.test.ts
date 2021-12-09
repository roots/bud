import {Hooks} from '@roots/bud-hooks'

describe.skip('@roots/bud-hooks', function () {
  let hooks: Hooks

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
    expect(hooks.repository).toMatchSnapshot()
  })
})
