import {beforeEach, describe, expect, it, vi} from 'vitest'

import {experiments as subject} from './index.js'

const callback = vi.fn() as any
const bud = {
  label: `bud`,
  hooks: {
    on: vi.fn((_label: string, value: any) => {
      return callback(value())
    }),
  },
} as any

describe(`bud.entry`, function () {
  let method: subject

  beforeEach(async () => {
    method = subject.bind(bud)
    vi.clearAllMocks()
  })

  it(`is a function`, () => {
    expect(method).toBeInstanceOf(Function)
  })

  it(`should return bud`, async () => {
    const ret = method({asyncWebAssembly: true})
    expect(ret).toBe(bud)
  })

  it(`should call bud.hooks.on one time`, async () => {
    method({asyncWebAssembly: true})
    expect(bud.hooks.on).toHaveBeenCalledTimes(1)
  })
})
