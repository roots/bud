import {helper, Assets} from '../util/integration'

const suite = helper('tailwindcss', 'examples/tailwindcss')

describe(`examples/tailwindcss`, () => {
  jest.setTimeout(1000000)

  describe('production', () => {
    let assets: Assets

    beforeAll(async () => {
      assets = await suite.setup()
      return
    })

    afterAll(suite.teardown)

    it('js: has contents', () => {
      expect(assets['app.js'].length).toBeGreaterThan(10)
    })

    it('js: is transpiled', () => {
      expect(assets['app.js'].includes('import')).toBeFalsy()
    })

    it('css: has contents', () => {
      expect(assets['app.css'].length).toBeGreaterThan(10)
    })

    it('css: is transpiled', () => {
      expect(assets['app.css'].includes('@import')).toBe(false)
    })

    it('css: @tailwind directive is transpiled', () => {
      expect(assets['app.css'].includes('@apply')).toBe(false)
    })

    it('css: has whitespace removed', () => {
      expect(assets['app.css'].match(/    /)).toBeFalsy()
    })

    it('css: has breaks removed', () => {
      expect(assets['app.css'].match(/\\n/)).toBeFalsy()
    })
  })
})
