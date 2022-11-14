import {Bud} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {config as configFn} from './index.js'

const mockBud = {
  bindMethod: vi.fn(() => null),
  hooks: {
    action: vi.fn(() => null),
  },
  log: vi.fn(() => null),
  error: vi.fn(() => null),
  fatal: vi.fn(() => null),
} as unknown as Bud

describe(`bud.config`, function () {
  let config: configFn

  beforeEach(async () => {
    config = configFn.bind(mockBud)
    vi.clearAllMocks()
  })

  it(`should be a function`, () => {
    expect(config).toBeInstanceOf(Function)
  })

  it(`should return bud`, () => {
    expect(config({})).toEqual(mockBud)
  })

  it(`should throw with no input`, () => {
    // @ts-ignore
    expect(() => config()).toThrow()
  })

  it(`should accept object configuration`, async () => {
    config({entry: `foo`})
    expect(mockBud.hooks.action).toHaveBeenCalledWith(
      `build.after`,
      expect.any(Function),
    )
  })

  it(`should accept a callback function`, async () => {
    const callback = () => ({})
    config(callback)
    expect(mockBud.hooks.action).toHaveBeenCalledWith(
      `build.after`,
      expect.any(Function),
    )
  })
})
