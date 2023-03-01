import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'
import {setPath as subject} from './setPath.js'

describe(`bud.setPath`, () => {
  let bud: Bud
  let setPath: subject

  beforeEach(async () => {
    vi.clearAllMocks()

    bud = await factory()

    setPath = subject.bind(bud)
  })

  it(`is a function`, () => {
    expect(setPath).toBeInstanceOf(Function)
  })

  it(`returns Bud`, () => {
    expect(setPath(`@src`, `test`)).toBe(bud)
  })

  it(`sets a path`, () => {
    const hooksOnSpy = vi.spyOn(bud.hooks, `on`)
    setPath(`@src`, `test`)
    expect(hooksOnSpy).toHaveBeenCalled()
  })

  it(`sets context when only a string is passed`, () => {
    setPath(`/test`)
    expect(bud.context.basedir).toBe(`/test`)
  })

  it(`throws when an invalid value is passed`, () => {
    try {
      // @ts-ignore
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
