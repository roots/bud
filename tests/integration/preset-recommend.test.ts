import {helper, Assets} from '../util/integration'

const suite = helper(
  'preset-recommend',
  'examples/preset-recommend',
)

describe(`examples/preset-recommend`, () => {
  jest.setTimeout(1000000)

  describe('production', () => {
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
  })
})
