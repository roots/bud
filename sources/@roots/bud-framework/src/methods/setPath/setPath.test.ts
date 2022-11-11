import {beforeEach, describe, expect, it, vi} from 'vitest'

import {setPath as subject} from './setPath.js'

let bud = {
  info: vi.fn(),
  context: {
    basedir: `/foo`,
  },
  hooks: {
    on: vi.fn(),
  },
  path: vi.fn((...args) => `/test-return`),
}

describe(`bud.setPath`, function () {
  let setPath

  beforeEach(async () => {
    vi.clearAllMocks()
    bud.context.basedir = `/foo`
    bud.path = vi.fn(() => `/test-return`)
    setPath = subject.bind(bud)
  })

  it(`is a function`, () => {
    expect(setPath).toBeInstanceOf(Function)
  })

  it(`returns Bud`, () => {
    expect(setPath(`@src`, `test`)).toBe(bud)
  })

  it(`sets a path`, () => {
    setPath(`@src`, `test`)
    expect(bud.hooks.on).toHaveBeenCalled()
  })

  it(`sets context when only a string is passed`, () => {
    setPath(`/test`)
    expect(bud.context.basedir).toBe(`/test`)
  })

  it(`throws when an invalid value is passed`, () => {
    try {
      expect(setPath(`src`, `test-foo`)).toThrowError()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  it(`throws when a path doesn't resolve correctly`, () => {
    bud.path = vi.fn(() => `foo`)
    try {
      expect(setPath(`@src`, `test-foo`)).toThrowError()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  it(`sets multiple paths`, () => {
    const value = {
      '@src': `src-test`,
      '@dist': `dist-test`,
    }

    setPath(value)

    expect(bud.hooks.on).toHaveBeenNthCalledWith(
      1,
      `location.@src`,
      `/test-return`,
    )
    expect(bud.hooks.on).toHaveBeenLastCalledWith(
      `location.@dist`,
      `/test-return`,
    )
  })
})
