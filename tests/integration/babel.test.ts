import {helper, Assets} from '../util/integration'

const suite = helper('babel', 'examples/babel')

jest.setTimeout(1000000)

describe(suite.name, () => {
  let assets: Assets

  beforeAll(async () => {
    assets = await suite.setup()
    return
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(assets['app.js'].length).toBeGreaterThan(10)
    })
    it('is transpiled', () => {
      expect(assets['app.js'].includes('import')).toBeFalsy()
    })
  })
})
