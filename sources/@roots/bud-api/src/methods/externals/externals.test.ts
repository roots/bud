import {beforeEach, describe, expect, it, vi} from 'vitest'

import {externals as subject} from './externals.method.js'

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
    const ret = method({foo: [`bar`]})
    expect(ret).toBe(bud)
  })

  it(`should call bud.hooks.on one time`, async () => {
    method({foo: [`bar`]})
    expect(bud.hooks.on).toHaveBeenCalledTimes(1)
  })
})
