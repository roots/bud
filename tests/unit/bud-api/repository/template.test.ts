import {Bud, factory} from '../../../util/bud'

describe('bud.template', function () {
  describe('default', () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    afterAll(done => {
      bud.close(done)
    })

    it('is a function', () => {
      expect(bud.template).toBeInstanceOf(Function)
    })

    it('html-webpack-plugin not set', () => {
      expect(bud.extensions.has('html-webpack-plugin')).toBe(
        false,
      )
    })

    it('interpolate-html-plugin not set', () => {
      expect(bud.extensions.has('interpolate-html-plugin')).toBe(
        false,
      )
    })
  })

  describe('called', () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
      bud.extensions.remove('html-webpack-plugin')
      bud.store.set('features.html', false)
    })

    afterAll(done => {
      bud.close(done)
    })

    it('returns bud', async () => {
      const apiReturns = await bud.api.call('template')

      expect(bud.template()).toBeInstanceOf(Bud)
      expect(bud.template()).toBe(apiReturns)
    })

    it('adds html webpack plugin', async () => {
      await bud.api.call('template')

      expect(bud.extensions.has('html-webpack-plugin')).toEqual(
        true,
      )
    })

    it('adds interpolate-html-plugint', () => {
      expect(bud.extensions.has('interpolate-html-plugin')).toBe(
        true,
      )
    })

    it('enables html feature flag', async () => {
      await bud.api.call('template')
      expect(bud.store.is('features.html', true)).toEqual(true)
    })
  })

  describe('called with options', () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    afterAll(done => {
      bud.close(done)
    })

    it('does not register plugin when explicitly disabled', async () => {
      await bud.api.call('template', false)

      expect(bud.store.is('features.html', false)).toEqual(true)
    })

    it('changes the template when template options is passed', async () => {
      const props = {template: 'src/foo.html'}
      await bud.api.call('template', false)
      await bud.api.call('template', props)

      expect(
        bud.extensions
          .get('html-webpack-plugin')
          .options.get('template'),
      ).toBe(props.template)
    })
  })
})
