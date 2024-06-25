import {type Bud, factory} from '@repo/test-kit'
import {beforeAll, describe, expect, it, vi} from 'vitest'

import {before as subject} from '../../../src/methods/before/index.js'

describe(`@roots/bud-framework/methods/before`, function () {
  let before: subject
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    before = subject.bind(bud)
  })

  it(`should be a function`, () => {
    expect(before).toBeInstanceOf(Function)
  })

  it(`should return bud`, async () => {
    const value = before(async () => {})
    expect(value).toBe(bud)
  })

  it(`should call the callback`, async () => {
    const fn = vi.fn(async () => null)
    before(fn)
    await bud.hooks.fire(`compiler.before`, bud)
    expect(fn).toHaveBeenCalled()
  })

  it(`should work with a synchronous callback`, async () => {
    const fn = vi.fn()
    before(fn)
    await bud.hooks.fire(`compiler.before`, bud)
    expect(fn).toHaveBeenCalled()
  })

  it(`should call the error handler if supplied`, async () => {
    const onError = vi.fn()
    before(() => {
      throw new Error(`test`)
    }, onError)
    await bud.hooks.fire(`compiler.before`, bud)
    expect(onError).toHaveBeenCalled()
  })
})
