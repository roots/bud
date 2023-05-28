import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'
import {setPath as subject} from '../../../src/methods/setPath/setPath.js'

describe(`bud.setPath`, () => {
  let bud: Bud
  let setPath: subject

  beforeEach(async () => {
    vi.clearAllMocks()

    bud = await factory()

    setPath = subject.bind(bud)
  })

  it(`should be a function`, () => {
    expect(setPath).toBeInstanceOf(Function)
  })

  it(`should return Bud`, () => {
    expect(setPath(`@src`, `test`)).toBe(bud)
  })

  it(`should set a path`, () => {
    const hooksOnSpy = vi.spyOn(bud.hooks, `on`)
    setPath(`@src`, `test`)
    expect(hooksOnSpy).toHaveBeenCalled()
  })

  it(`should set context when only a string is passed`, () => {
    setPath(`/test`)
    expect(bud.context.basedir).toBe(`/test`)
  })

  it(`should throw when an invalid value is passed`, () => {
    try {
      // @ts-ignore
      expect(setPath(`src`, `test-foo`)).toThrowError()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  it(`should throw when a path doesn't resolve correctly`, () => {
    bud.path = vi.fn(() => `foo`)
    try {
      expect(setPath(`@src`, `test-foo`)).toThrowError()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  it(`should set multiple paths`, () => {
    bud.relPath = vi.fn(() => `test-return`)
    const hooksOnSpy = vi.spyOn(bud.hooks, `on`)

    setPath({
      '@src': `src-test`,
      '@dist': `dist-test`,
    })

    expect(hooksOnSpy).toHaveBeenNthCalledWith(
      1,
      `location.@src`,
      `test-return`,
    )

    expect(hooksOnSpy).toHaveBeenLastCalledWith(
      `location.@dist`,
      `test-return`,
    )
  })
})
