import {helper, Assets} from '../util/integration'

const suite = helper('postcss', 'examples/postcss')

jest.setTimeout(1000000)

describe(suite.name, () => {
  let assets: Assets

  beforeAll(async () => {
    assets = await suite.setup()
  })

  describe('main.css', () => {
    it('has contents', () => {
      expect(assets['app.css'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(assets['app.css'].includes('@import')).toBeFalsy()
    })

    it('successfully used @import', () => {
      expect(assets['app.css'].includes('h2')).toBeTruthy()
    })
  })
})
