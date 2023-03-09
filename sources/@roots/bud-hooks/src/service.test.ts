import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it, vi} from 'vitest'

import Hooks from './index.js'

describe(`@roots/bud-hooks`, function () {
  let bud: Bud

  let hooks: Hooks

  beforeAll(async () => {
    bud = await factory()
    hooks = new Hooks(() => bud)
    hooks.syncStore.store = {}
    hooks.asyncStore.store = {}
    // @ts-ignore
    hooks.events.store = {}
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
    hooks.async(`build.resolve`, callback)
    expect(
      hooks.asyncStore.store[`build.resolve`]?.pop()?.get(),
    ).toStrictEqual(callback)
  })

  it(`filterAsync retrieves value`, async () => {
    const callback = async () => `bar`
    hooks.async(`build.resolve`, callback)
    const value = await hooks.filterAsync(`build.resolve`)
    expect(value).toBe(`bar`)
  })

  it(`action registers callable function`, async () => {
    const value = vi.fn(async (app: Bud) => null)
    // @ts-ignore
    hooks.action(`app.build`, value)
    expect(hooks.events.store[`app.build`].pop()).toBe(value)
  })

  it(`fire calls action function`, async () => {
    const value = vi.fn(async () => null)
    hooks.action(`build.before`, value)
    await hooks.fire(`build.before`, bud)
    expect(value).toHaveBeenCalled()
  })
})
