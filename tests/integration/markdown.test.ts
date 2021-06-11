import {helper, Assets} from '../util/integration'

const suite = helper('md', 'examples/markdown')

jest.setTimeout(1000000)

describe(suite.name, () => {
  let assets: Assets

  beforeAll(async () => {
    assets = await suite.setup()
  })

  describe('main.js', () => {
    it('has contents', () => {
      expect(assets['main.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(assets['main.js'].includes('import')).toBeFalsy()
    })
  })
})
