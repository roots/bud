import {readFile} from 'fs-extra'
import {helper, Assets} from '../util/integration'

const suite = helper('imagemin', 'examples/imagemin')

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
  })

  describe('owl.jpeg', () => {
    it('is smaller than the original', async () => {
      const original = await readFile(
        `${process.cwd()}/examples/imagemin/src/owl.jpeg`,
        'utf8',
      )

      expect(assets['assets/owl.jpeg'].length).toBeLessThan(
        original.length,
      )

      return Promise.resolve()
    })
  })
})
