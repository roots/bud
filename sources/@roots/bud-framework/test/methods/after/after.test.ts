import {type Bud, factory} from '@repo/test-kit'
import {beforeAll, describe, expect, it, vi} from 'vitest'

import {after as subject} from '../../../src/methods/after/index.js'

describe(`bud.after`, function () {
  let after: subject
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    after = subject.bind(bud)
  })

  it(`should be a function`, () => {
    expect(after).toBeInstanceOf(Function)
  })

  it(`should return bud`, async () => {
    const value = after(async () => {})
    expect(value).toBe(bud)
  })

  it(`should call the callback`, async () => {
    const fn = vi.fn(async () => null)
    after(fn)
    await bud.hooks.fire(`compiler.done`, bud, {})
    expect(fn).toHaveBeenCalled()
  })

  it(`should work with a synchronous callback`, async () => {
    const fn = vi.fn()
    after(fn)
    await bud.hooks.fire(`compiler.done`, bud, {})
    expect(fn).toHaveBeenCalled()
  })

  it(`should call the error handler if supplied`, async () => {
    const onError = vi.fn()
    after(() => {
      throw new Error(`test`)
    }, onError)
    await bud.hooks.fire(`compiler.done`, bud, {})

    expect(onError).toHaveBeenCalled()
  })
})
