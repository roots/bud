import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {pipe as subject} from './pipe.js'

describe(`bud.pipe`, function () {
  let pipe: subject
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    pipe = subject.bind(bud)
  })

  it(`is a function`, () => {
    expect(pipe).toBeInstanceOf(Function)
  })

  it(`returns Bud when initial value is \`undefined\``, async () => {
    const callback = vi.fn(async value => value)
    const value = await pipe([callback], undefined)
    expect(callback).toHaveBeenCalledWith(bud)
    expect(value).toBe(bud)
  })

  it(`pipes value`, async () => {
    const callback = vi.fn(async v => `${v}!`)
    const value = await pipe([callback, callback, callback], `test`)

    expect(callback).toHaveBeenNthCalledWith(1, `test`)
    expect(callback).toHaveBeenNthCalledWith(2, `test!`)
    expect(callback).toHaveBeenNthCalledWith(3, `test!!`)

    expect(value).toBe(`test!!!`)
  })
})
