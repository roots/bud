import {helper, Assets} from '../util/integration'

const suite = helper('html-template', 'examples/html-template')

jest.setTimeout(1000000)

describe(suite.name, () => {
  let assets: Assets

  beforeAll(async () => {
    assets = await suite.setup()
    return
  })

  describe('index.html', () => {
    it('is the correct html', () => {
      expect(assets['index.html']).toEqual(
        `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width,initial-scale=1"/> <meta name="theme-color" content="#000000"/> <meta name="description" content="html templating example"/> <title>Demo</title> <link rel="icon" href="/favicon.ico"><script defer src="/app.js"></script></head> <body> <noscript>You need to enable JavaScript to run this app.</noscript> <div id="root"></div> </body> </html> `,
      )
    })
  })
})
