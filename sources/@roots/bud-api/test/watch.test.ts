import {Bud, factory} from '@repo/test-kit'
import {watch as subject} from '@roots/bud-api/methods/watch'
import {beforeEach, describe, expect, it, vi} from 'vitest'

describe(`bud.watch`, () => {
  describe(`in development`, () => {
    let bud: Bud
    let watch: subject

    beforeEach(async () => {
      bud = await factory({mode: `development`})
      watch = subject.bind(bud)
    })

    it(`should add watch files`, async () => {
      await watch(`1/*.js`)

      const value = bud.hooks.filter(`dev.watch.files`)

      if (!(value instanceof Set))
        throw new Error(`watch files should be a set`)

      expect(Array.from(value)).toMatchSnapshot(
        expect.arrayContaining([`1/*.js`]),
      )
    })
  })

  describe(`in production`, () => {
    let bud: Bud
    let watch: subject

    beforeEach(async () => {
      bud = await factory({mode: `production`})
      watch = subject.bind(bud)
    })

    it(`should not run`, async () => {
      expect(bud.mode).toBe(`production`)

      const watch = subject.bind(bud)

      await watch(`1/*.js`)

      const value = bud.hooks.filter(`dev.watch.files`)
      expect(value).toBeUndefined()
    })
  })

  describe(`string file`, () => {
    let bud: Bud
    let watch: subject

    beforeEach(async () => {
      bud = await factory({mode: `development`})
      watch = subject.bind(bud)
    })

    it(`should add files`, async () => {
      await watch(`1/*.js`)

      // @ts-ignore
      expect(Array.from(bud.hooks.filter(`dev.watch.files`))).toEqual(
        expect.arrayContaining([`1/*.js`]),
      )
    })
  })

  describe(`array files`, () => {
    let bud: Bud
    let watch: subject

    beforeEach(async () => {
      bud = await factory({mode: `development`})
      watch = subject.bind(bud)
    })

    it(`should add files`, async () => {
      await watch([`1/*.js`, `2/*.js`])

      // @ts-ignore
      expect(Array.from(bud.hooks.filter(`dev.watch.files`))).toEqual(
        expect.arrayContaining([`1/*.js`, `2/*.js`]),
      )
    })
  })

  describe(`[Array, Options] parameters`, () => {
    let bud: Bud
    let watch: subject

    beforeEach(async () => {
      bud = await factory({mode: `development`})
      watch = subject.bind(bud)
    })

    it(`should add watch files and options`, async () => {
      await watch([`1/*.js`], {
        usePolling: true,
      })

      const value = bud.hooks.filter(`dev.watch.files`)

      if (!(value instanceof Set))
        throw new Error(`watch files should be a set`)

      expect(Array.from(value)).toMatchSnapshot(
        expect.arrayContaining([`1/*.js`]),
      )

      const options = bud.hooks.filter(`dev.watch.options`)
      expect(options).toMatchInlineSnapshot(`
        {
          "usePolling": true,
        }
      `)
    })
  })

  describe(`Options only`, () => {
    let bud: Bud
    let watch: subject

    beforeEach(async () => {
      bud = await factory({mode: `development`})
      watch = subject.bind(bud)
    })

    it(`should add options`, async () => {
      await watch({
        usePolling: true,
      })

      const options = bud.hooks.filter(`dev.watch.options`)
      expect(options).toMatchInlineSnapshot(`
        {
          "usePolling": true,
        }
      `)
    })
  })
})
