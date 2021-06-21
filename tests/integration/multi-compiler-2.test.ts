import {helper, Assets} from '../util/integration'

const suite = helper(
  'multi-compiler-2',
  'examples/multi-compiler-2',
)

jest.setTimeout(1000000)

describe(suite.name, () => {
  let assets: Assets

  beforeAll(async () => {
    assets = await suite.setup()
    return Promise.resolve()
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(assets['app.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(assets['app.js'].includes('import')).toBeFalsy()
    })
  })

  describe('theme.js', () => {
    it('has contents', () => {
      expect(assets['theme.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(assets['theme.js'].includes('import')).toBeFalsy()
    })
  })

  describe('plugin.js', () => {
    it('has contents', () => {
      expect(assets['plugin.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(assets['plugin.js'].includes('import')).toBeFalsy()
    })
  })
})
