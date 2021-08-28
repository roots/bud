import {Assets, helper} from '../util/integration'

const suite = helper('basic', 'examples/basic')

jest.setTimeout(60000)

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

    it('matches snapshot', () => {
      expect(assets['main.js']).toMatchSnapshot()
    })
  })
})
