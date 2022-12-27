import {factory, repoPath} from '@repo/test-kit/bud'
import {Bud} from '@roots/bud-framework'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {alias as aliasFn} from './index.js'

describe(`bud.alias`, () => {
  let bud: Bud
  let alias: typeof aliasFn

  beforeEach(async () => {
    vi.restoreAllMocks()
    bud = await factory()
    alias = aliasFn.bind(bud)
  })

  it(`should be operating in an expected env`, async () => {
    expect(bud.path(`@src`)).toBe(
      repoPath(`tests`, `util`, `project`, `src`),
    )
  })

  it(`should be a function`, () => {
    expect(bud.alias).toBeInstanceOf(Function)
  })

  it(`should set an alias from an object`, async () => {
    const asyncSpy = vi.spyOn(bud.hooks, `async`)
    await alias({'@foo': bud.path(`@src`, `foo`)})

    expect(asyncSpy).toHaveBeenCalledWith(`build.resolve.alias`, {
      '@src': bud.path(`@src`),
      '@foo': bud.path(`@src`, `foo`),
    })

    const value = await bud.hooks.filterAsync(`build.resolve.alias`)
    expect(value).toEqual({
      '@src': bud.path(`@src`),
      '@foo': bud.path(`@src`, `foo`),
    })
  })

  it(`should set async hook from signifier value pair`, async () => {
    const asyncSpy = vi.spyOn(bud.hooks, `async`)
    await alias('test', 'test')
    expect(asyncSpy).toHaveBeenCalledWith(
      `build.resolve.alias`,
      expect.objectContaining({test: `test`}),
    )
  })

  it(`should set an alias from signifier value pair`, async () => {
    await alias(`@foo`, bud.path(`@src/foo`))
    const value = await bud.hooks.filterAsync(`build.resolve.alias`)

    expect(value).toEqual({
      '@src': bud.path(`@src`),
      '@foo': bud.path(`@src/foo`),
    })
  })

  it(`should set async hook with callback`, async () => {
    const asyncSpy = vi.spyOn(bud.hooks, `async`)
    await alias(async () => ({test: 'test'}))
    expect(asyncSpy).toHaveBeenCalledWith(
      `build.resolve.alias`,
      expect.any(Function),
    )
  })

  describe(`with malformed input`, () => {
    let bud: Bud
    let alias: typeof aliasFn

    beforeEach(async () => {
      bud = await factory()
      alias = aliasFn.bind(bud)
      vi.restoreAllMocks()
    })

    it(`should set an alias from a callback`, async () => {
      await alias(async _aliases => ({
        '@test': bud.path(`@src/test`),
      }))

      const value = await bud.hooks.filterAsync(`build.resolve.alias`)

      expect(value).toEqual({
        '@test': bud.path(`@src/test`),
      })
    })

    it(`should error when a non string value is passed`, async () => {
      vi.mock(`./isRecords.js`)
      vi.mock(`./handleRecords.js`)
      vi.mock(`./handleTypeError.js`)
      vi.mock(`./isSignifierValuePair.js`)

      try {
        expect(
          // @ts-ignore
          await alias({[`@foo`]: [bud.path(`@src/foo`), 6]}),
        ).toThrowError(TypeError)
      } catch (e) {}

      expect(
        await import(`./isRecords.js`).then(({isRecords}) => isRecords),
      ).toHaveBeenCalledTimes(1)
      expect(
        await import(`./handleRecords.js`).then(
          ({handleRecords}) => handleRecords,
        ),
      ).toHaveBeenCalledTimes(1)

      expect(
        await import(`./isSignifierValuePair.js`).then(
          ({isSignifierValuePair}) => isSignifierValuePair,
        ),
      ).not.toHaveBeenCalled()
    })

    it(`should error when passed more than two parameters`, async () => {
      vi.mock(`./isCallback.js`)
      vi.mock(`./isRecords.js`)
      vi.mock(`./isSignifierValuePair.js`)
      vi.mock(`./handleFallthrough.js`)

      try {
        expect(
          // @ts-ignore
          await alias(`@foo`, bud.path(`@src/foo`), `error`),
        ).toThrowError(TypeError)
      } catch (e) {}

      expect(
        await import(`./handleFallthrough.js`).then(
          ({handleFallthrough}) => handleFallthrough,
        ),
      ).toHaveBeenCalledTimes(1)
      expect(
        await import(`./isCallback.js`).then(({isCallback}) => isCallback),
      ).toHaveBeenCalledTimes(1)
      expect(
        await import(`./isRecords.js`).then(({isRecords}) => isRecords),
      ).toHaveBeenCalledTimes(1)
      expect(
        await import(`./isSignifierValuePair.js`).then(
          ({isSignifierValuePair}) => isSignifierValuePair,
        ),
      ).toHaveBeenCalledTimes(1)
    })

    it(`should error when passed more than two parameters`, async () => {
      const logSpy = vi.spyOn(bud.api.logger, `error`)

      try {
        expect(
          // @ts-ignore
          await alias(`@foo`, bud.path(`@src/foo`), `error`),
        ).toThrowError(TypeError)
      } catch (e) {}
    })

    it(`should error when passed a non-intersecting type`, async () => {
      try {
        expect(
          // @ts-ignore
          await alias([100, `forest`], {beans: `bayou`}),
        ).toThrowError(Error)
      } catch (e) {}
    })
  })
})
