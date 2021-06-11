import {helper, Assets} from '../util/integration'

const suite = helper('tailwindcss', 'examples/tailwindcss')

jest.setTimeout(1000000)

describe(suite.name, () => {
  let assets: Assets

  beforeAll(async () => {
    assets = await suite.setup()
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(assets['app.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(assets['app.js'].includes('import')).toBeFalsy()
    })
  })

  describe('app.css', () => {
    it('has contents', () => {
      expect(assets['app.css'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(assets['app.css'].includes('@import')).toBe(false)
    })

    it('@tailwind directive is transpiled', () => {
      expect(assets['app.css'].includes('@apply')).toBe(false)
    })

    it('has whitespace removed', () => {
      expect(assets['app.css'].match(/    /)).toBeFalsy()
    })

    it('has breaks removed', () => {
      expect(assets['app.css'].match(/\\n/)).toBeFalsy()
    })
  })

  describe('jit', () => {
    it('is used to build css', () => {
      expect(
        assets['app.css'].match(/w-\\\[800px\\\]/),
      ).toBeTruthy()
    })
  })
})
