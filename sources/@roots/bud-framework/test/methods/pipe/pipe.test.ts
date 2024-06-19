import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {pipe as subject} from '../../../src/methods/pipe'

describe(`bud.pipe`, function () {
  let pipe: subject
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    pipe = subject.bind(bud)
  })

  it(`should be a function`, () => {
    expect(pipe).toBeInstanceOf(Function)
  })

  it(`should use bud when initial value is \`undefined\``, async () => {
    const callback = vi.fn(async value => value)
    const value = await pipe([callback], undefined)
    expect(callback).toHaveBeenCalledWith(bud)
    expect(value).toBe(bud)
  })

  it(`should pipe value between callbacks`, async () => {
    const callback = vi.fn(async v => `${v}!`)
    const value = await pipe([callback, callback, callback], `test`)

    expect(callback).toHaveBeenNthCalledWith(1, `test`)
    expect(callback).toHaveBeenNthCalledWith(2, `test!`)
    expect(callback).toHaveBeenNthCalledWith(3, `test!!`)

    expect(value).toBe(`test!!!`)
  })

  it(`should allow mixed use of sync and async callbacks`, async () => {
    const asyncCallback = vi.fn(async v => `${v}!`)
    const syncCallback = vi.fn(v => `${v}!`)

    const value = await pipe([asyncCallback, syncCallback], `test`)

    expect(asyncCallback).toHaveBeenCalledWith(`test`)
    expect(syncCallback).toHaveBeenCalledWith(`test!`)

    expect(value).toBe(`test!!`)
  })
})
