import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, beforeEach, describe, expect, it} from 'vitest'

describe(`bud.template`, function () {
  describe(`default`, () => {
    let bud: Bud

    beforeEach(async () => {
      bud = await factory()
      await bud.run()
    })

    it(`is a function`, async () => {
      expect(bud.template).toBeInstanceOf(Function)
    })

    it(`html-webpack-plugin is not set by default`, async () => {
      expect(
        bud.extensions.has(`@roots/bud-extensions/html-webpack-plugin`),
      ).toBe(true)
      expect(
        await bud.extensions
          .get(`@roots/bud-extensions/html-webpack-plugin`)
          .isEnabled(),
      ).toBe(false)
    })

    it(`interpolate-html-plugin is not set by default`, async () => {
      expect(
        await bud.extensions
          .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
          .isEnabled(),
      ).toBe(false)
    })
  })

  describe(`called`, () => {
    let bud: Bud

    beforeEach(async () => {
      bud = await factory()
      bud.extensions
        .get(`@roots/bud-extensions/html-webpack-plugin`)
        .disable()

      bud.hooks.on(`feature.html`, false)
    })

    it(`returns bud`, async () => {
      const apiReturns = await bud.api.call(`template`)
      expect(bud.template()).toBe(apiReturns)
    })

    it(`adds html webpack plugin`, async () => {
      await bud.api.call(`template`)

      expect(
        await bud.extensions
          .get(`@roots/bud-extensions/html-webpack-plugin`)
          .isEnabled(),
      ).toEqual(true)
    })

    it(`adds interpolate-html-plugint`, async () => {
      await bud.api.call(`template`)

      expect(
        await bud.extensions
          .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
          .isEnabled(),
      ).toBe(true)
    })
  })

  describe(`called with options`, () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    it(`can be disabled`, async () => {
      await bud.api.call(`template`)

      expect(
        await bud.extensions
          .get(`@roots/bud-extensions/html-webpack-plugin`)
          .isEnabled(),
      ).toBe(true)

      await bud.api.call(`template`, false)
      expect(
        await bud.extensions
          .get(`@roots/bud-extensions/html-webpack-plugin`)
          .isEnabled(),
      ).toBe(false)
    })

    it(`changes the template when template options is passed`, async () => {
      const props = {template: `src/foo.html`}
      await bud.api.call(`template`, false)
      await bud.api.call(`template`, props)

      expect(
        bud.extensions
          .get(`@roots/bud-extensions/html-webpack-plugin`)
          .getOption(`template`),
      ).toBe(props.template)
    })
  })
})
