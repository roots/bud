import {beforeEach, describe, expect, it, vi} from 'vitest'

import {experiments as subject} from '../src/methods/experiments'

const callback = vi.fn() as any
const bud = {
  hooks: {
    on: vi.fn((_label: string, value: any) => {
      return callback(value())
    }),
  },
  label: `bud`,
} as any

describe(`@roots/bud-api/methods/experiments`, function () {
  let method: subject

  beforeEach(async () => {
    method = subject.bind(bud)
    vi.clearAllMocks()
  })

  it(`is a function`, () => {
    expect(method).toBeInstanceOf(Function)
  })

  it(`should return bud`, async () => {
    const value = method({asyncWebAssembly: true})
    expect(value).toBe(bud)
  })

  it(`should call bud.hooks.on one time`, async () => {
    method({asyncWebAssembly: true})
    expect(bud.hooks.on).toHaveBeenCalledTimes(1)
  })
})
