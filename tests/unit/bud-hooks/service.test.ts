import {Bud, factory} from '@repo/test-kit/bud'
import {Framework} from '@roots/bud-build/types/Item/item.interface'
import {Hooks} from '@roots/bud-hooks'

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

  it('has an async method', () => {
    expect(hooks.on).toBeInstanceOf(Function)
  })

  it('has a filter method', () => {
    expect(hooks.filter).toBeInstanceOf(Function)
  })

  it('has a filterAsync method', () => {
    expect(hooks.on).toBeInstanceOf(Function)
  })

  it('has an action method', () => {
    expect(hooks.action).toBeInstanceOf(Function)
  })

  it('has a fire method', () => {
    expect(hooks.fire).toBeInstanceOf(Function)
  })

  it('async registers value', () => {
    const callback = async () => 'bar'
    hooks.async('build', callback)
    expect(hooks.repository.build).toStrictEqual([callback])
  })

  it('filterAsync retrieves value', async () => {
    const value = await hooks.filterAsync('build')
    expect(value).toBe('bar')
  })

  it('action registers callable function', async () => {
    const value = jest.fn((app: Framework) => null)
    hooks.action('event.app.close', value)
    expect(hooks.repository.event.app.close.pop()).toBe(value)
  })

  it('fire calls action function', async () => {
    const value = jest.fn(async () => null)
    hooks.action('event.app.close', value)
    await hooks.fire('event.app.close')
    expect(value).toHaveBeenCalled()
  })
})
