import {beforeEach, describe, expect, it, vi} from 'vitest'
import {factory, Bud} from '@repo/test-kit/bud'

import {AsyncHooks} from './async.js'

describe(`@roots/bud-hooks/async`, () => {
  describe(`class`, () => {
    let bud: Bud
    let asyncHooks: AsyncHooks

    beforeEach(async () => {
      bud = await factory()
      asyncHooks = new AsyncHooks(() => bud)
    })

    it(`should be instantiable`, () => {
      expect(asyncHooks).toBeInstanceOf(AsyncHooks)
    })

    it(`should be instantiable`, () => {
      asyncHooks.store = {
        'build.plugins': [bud.value.make(async () => [])],
      }
      expect(asyncHooks.has(`build.plugins`)).toBe(true)

      asyncHooks.store = {}
      expect(asyncHooks.has(`build.plugins`)).toBe(false)
    })
  })

  describe(`set`, () => {
    let bud: Bud
    let asyncHooks: AsyncHooks

    beforeEach(async () => {
      bud = await factory()
      asyncHooks = new AsyncHooks(() => bud)
    })

    it(`should have a set method that sets a store value`, async () => {
      asyncHooks.set(`build.plugins`, () => `bar`)
      expect(asyncHooks.store[`build.plugins`]).toHaveLength(1)
    })

    it(`should have a set method that appends a new value onto existing store key`, async () => {
      asyncHooks.set(`build.plugins`, () => `bar`)
      asyncHooks.set(`build.plugins`, () => `baz2`)
      expect(asyncHooks.store[`build.plugins`]).toHaveLength(2)
    })

    it(`should have a set method that replaces all existing values when the given is not a function`, async () => {
      asyncHooks.set(`build.plugins`, () => `bar`)
      asyncHooks.set(`build.plugins`, `baz2`)
      expect(asyncHooks.store[`build.plugins`]).toHaveLength(1)
    })

    it(`should have a set method that calls has for id check`, async () => {
      const spy = vi.spyOn(asyncHooks, `has`)
      asyncHooks.set(`build.plugins`, [])
      expect(spy).toHaveBeenCalledWith(`build.plugins`)
    })

    it(`should have a set method that accepts n-parameters`, async () => {
      asyncHooks.set(
        `build.plugins`,
        () => [],
        () => [],
        () => [],
      )
      expect(asyncHooks.store[`build.plugins`]).toHaveLength(3)
    })

    it(`should have a set method that accepts n-parameters`, async () => {
      const spy = vi.spyOn(asyncHooks, `has`)
      asyncHooks.set(
        `build.plugins`,
        () => [],
        () => [],
        1,
      )
      expect(spy).toHaveBeenCalledWith(`build.plugins`)
      expect(asyncHooks.store[`build.plugins`]).toHaveLength(1)
    })

    it(`should return bud`, async () => {
      const returnValue = asyncHooks.set(`build.plugins`, [])
      expect(returnValue).toBe(bud)
    })
  })

  describe(`get`, () => {
    let bud: Bud
    let asyncHooks: AsyncHooks

    beforeEach(async () => {
      vi.clearAllMocks()
      bud = await factory()
      asyncHooks = new AsyncHooks(() => bud)
    })

    it(`should have a get method that gets a store value`, async () => {
      const spy = vi.fn()
      const callback = () => spy
      asyncHooks.set(`build.plugins`, callback)
      const value = await asyncHooks.get(`build.plugins`)
      expect(value).toBe(spy)
    })

    it(`should have a get method that gets a store value`, async () => {
      const spy1 = vi.fn(value => `1`)
      const spy2 = vi.fn(value => `2`)

      asyncHooks.set(`build.plugins`, () => spy1)
      asyncHooks.set(`build.plugins`, () => spy2)

      const value = await asyncHooks.get(`build.plugins`)
      expect(value).toBe(spy2)
    })

    it(`should have a get method that returns fallback if no store value exists`, async () => {
      const fallback = vi.fn(value => `1`)

      // @ts-ignore
      const value = await asyncHooks.get(`build.plugins`, fallback)
      expect(value).toBe(fallback)
    })

    it(`should have a get method that returns fallback if no store value exists`, async () => {
      const fallback = 1
      const spy1 = vi.fn(value => 2)

      asyncHooks.set(`build.plugins`, spy1)
      const value = await asyncHooks.get(
        `build.plugins`,
        // @ts-ignore
        fallback,
      )
      expect(spy1).toHaveBeenCalledWith(1)
      expect(value).toBe(2)
    })

    it(`should have a get method that returns fallback if no store value exists`, async () => {
      const existing = 2
      const fallback = 1

      asyncHooks.set(`build.plugins`, existing)
      const value = await asyncHooks.get(
        `build.plugins`,
        // @ts-ignore
        fallback,
      )
      expect(value).toBe(2)
    })
  })

  describe(`setRecords`, () => {
    let bud: Bud
    let asyncHooks: AsyncHooks

    beforeEach(async () => {
      bud = await factory()
      asyncHooks = new AsyncHooks(() => bud)
    })

    it(`should set store records`, async () => {
      asyncHooks.setRecords({
        // @ts-ignore
        foo: 'bar',
        bar: () => 'baz',
      })
      expect(asyncHooks.store['foo']).toHaveLength(1)
      expect(asyncHooks.store['bar']).toHaveLength(1)
      // @ts-ignore
      expect(await asyncHooks.get(`foo`)).toBe(`bar`)
    })
  })
})
