import {beforeAll, describe, expect, it, jest} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'
import {Hooks} from '@roots/bud-hooks'

describe(`@roots/bud-hooks`, function () {
  let bud: Bud

  let hooks: Hooks

  beforeAll(async () => {
    bud = await factory()
    hooks = new Hooks(bud)
    hooks.store = {} as any
  })

  it(`has an on method`, () => {
    expect(hooks.on).toBeInstanceOf(Function)
  })

  it(`has an async method`, () => {
    expect(hooks.on).toBeInstanceOf(Function)
  })

  it(`has a filter method`, () => {
    expect(hooks.filter).toBeInstanceOf(Function)
  })

  it(`has a filterAsync method`, () => {
    expect(hooks.on).toBeInstanceOf(Function)
  })

  it(`has an action method`, () => {
    expect(hooks.action).toBeInstanceOf(Function)
  })

  it(`has a fire method`, () => {
    expect(hooks.fire).toBeInstanceOf(Function)
  })

  it(`async registers value`, () => {
    const callback = async () => `bar`
    // @ts-ignore
    hooks.async(`build.resolve`, callback)
    expect(hooks.store[`build.resolve`]).toStrictEqual([callback])
  })

  it(`filterAsync retrieves value`, async () => {
    const value = await hooks.filterAsync(`build.resolve`)
    expect(value).toBe(`bar`)
  })

  it(`action registers callable function`, async () => {
    const value = jest.fn(async (app: Bud) => null)
    // @ts-ignore
    hooks.action(`event.app.build`, value)
    expect(hooks.store[`event.app.build`].pop()).toBe(value)
  })

  it(`fire calls action function`, async () => {
    const value = jest.fn(async () => null)
    hooks.action(`event.build.before`, value)
    await hooks.fire(`event.build.before`)
    expect(value).toHaveBeenCalled()
  })
})
