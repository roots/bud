import {Assets, helper} from '../util/integration'

const suite = helper('react', 'examples/react')

jest.setTimeout(60000)

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
    it('is transpiled', () => {
      expect(assets['app.css']).toMatchSnapshot()
    })
  })
})
