import {Assets, helper} from '../util/integration'

const suite = helper('html-template', 'examples/html-template')

jest.setTimeout(60000)

describe(suite.name, () => {
  let assets: Assets

  beforeAll(async () => {
    assets = await suite.setup()
  })

  describe('index.html', () => {
    it('is the correct html', () => {
      expect(assets['index.html']).toMatchSnapshot()
    })
  })
})
