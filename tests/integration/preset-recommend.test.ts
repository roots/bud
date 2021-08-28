import {Assets, helper} from '../util/integration'

const suite = helper(
  'preset-recommend',
  'examples/preset-recommend',
)

jest.setTimeout(60000)

describe(suite.name, () => {
  let assets: Assets

  beforeAll(async () => {
    assets = await suite.setup()
    return
  })

  describe('main.js', () => {
    it('has contents', () => {
      expect(assets['main.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(assets['main.js'].includes('import')).toBeFalsy()
    })
  })

  describe('main.css', () => {
    it('is transpiled', () => {
      expect(assets['main.css']).toMatchSnapshot()
    })
  })
})
