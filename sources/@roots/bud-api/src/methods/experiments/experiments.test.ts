import {describe, expect, it, jest} from '@jest/globals'

import {experiments as subject} from './experiments.method.js'

const callback = jest.fn() as any
const bud = {
  label: `bud`,
  hooks: {
    on: jest.fn((_label: string, value: any) => {
      return callback(value())
    }),
  },
} as any

describe(`bud.entry`, function () {
  let method: subject

  beforeEach(async () => {
    method = subject.bind(bud)
    jest.clearAllMocks()
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
