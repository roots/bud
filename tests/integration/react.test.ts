import {helper, Assets} from '../util/integration'

const suite = helper('md', 'examples/react')

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
      expect(assets['app.css']).toEqual(
        `body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;margin:0}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.App{align-content:center;background-color:#040111;display:flex;height:100vh;justify-content:center;max-height:100vh;max-width:100vw;text-align:center;width:100vw}.App .logo{-webkit-animation:App-logo-spin 20s linear infinite;animation:App-logo-spin 20s linear infinite;height:30vmin;margin-bottom:2rem;pointer-events:none}.App .header{align-items:center;color:#fff;display:flex;flex-direction:column;font-size:calc(10px + 2vmin);justify-content:center;min-height:80vh;width:100%}@-webkit-keyframes App-logo-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes App-logo-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}`,
      )
    })
  })
})
