import {helper, Assets} from '../util/integration'

const suite = helper('emotion', 'examples/emotion')

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
      expect(
        assets['app.js'].includes(
          `@keyframes App-logo-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}height:30vmin;pointer-events:none;margin-bottom:2rem;animation:App-logo-spin infinite 20s linear`,
        ),
      ).toBe(true)
    })
  })
})
