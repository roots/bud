import {Bud, factory} from '@repo/test-kit/bud'

describe(`bud.template`, function () {
  describe(`default`, () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    it(`is a function`, () => {
      expect(bud.template).toBeInstanceOf(Function)
    })

    it(`html-webpack-plugin is set`, () => {
      expect(bud.extensions.has(`html-webpack-plugin`)).toBe(true)
    })

    it(`interpolate-html-plugin is set`, () => {
      expect(bud.extensions.has(`interpolate-html-plugin`)).toBe(true)
    })
  })

  describe(`called`, () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
      bud.extensions.remove(`html-webpack-plugin`)
      bud.hooks.on(`feature.html`, false)
    })

    it(`returns bud`, async () => {
      const apiReturns = await bud.api.call(`template`)
      expect(bud.template()).toBe(apiReturns)
    })

    it(`adds html webpack plugin`, async () => {
      await bud.api.call(`template`)

      expect(bud.extensions.has(`html-webpack-plugin`)).toEqual(true)
    })

    it(`adds interpolate-html-plugint`, () => {
      expect(bud.extensions.has(`interpolate-html-plugin`)).toBe(true)
    })

    it(`enables html feature flag`, async () => {
      await bud.api.call(`template`)
      expect(bud.hooks.filter(`feature.html`)).toEqual(true)
    })
  })

  describe(`called with options`, () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    afterAll(done => {
      bud.close(done)
    })

    it(`can be disabled`, async () => {
      await bud.api.call(`template`, false)
      expect(bud.hooks.filter(`feature.html`)).toEqual(false)
    })

    it(`changes the template when template options is passed`, async () => {
      const props = {template: `src/foo.html`}
      await bud.api.call(`template`, false)
      await bud.api.call(`template`, props)

      expect(
        bud.extensions.get(`html-webpack-plugin`).getOption(`template`),
      ).toBe(props.template)
    })
  })
})
