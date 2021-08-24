import {readFile, readJson} from 'fs-extra'
import {join} from 'path'

import {Assets, helper} from '../util/integration'

const suite = helper('babel', 'examples/babel')

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

  describe('snapshots', () => {
    it('dist/manifest.json', async () => {
      const artifact = await readFile(
        join(process.cwd(), 'examples/babel/dist/manifest.json'),
      )

      expect(artifact.toString()).toMatchSnapshot()
    })

    it('dist/app.css', async () => {
      const artifact = await readFile(
        join(process.cwd(), 'examples/babel/dist/app.css'),
      )

      expect(artifact.toString()).toMatchSnapshot()
    })

    it('dist/app.js', async () => {
      const artifact = await readFile(
        join(process.cwd(), 'examples/babel/dist/app.js'),
      )

      expect(artifact.toString()).toMatchSnapshot()
    })

    it('.budfiles/bud.webpack.config.js', async () => {
      let artifact = await import(
        join(
          process.cwd(),
          'examples/babel/.budfiles/bud.webpack.config.js',
        )
      )

      artifact = artifact()

      expect(artifact.entry).toMatchSnapshot()
      expect(artifact.mode).toMatchSnapshot()
      expect(artifact.optimization).toMatchSnapshot()
      expect(artifact.bail).toMatchSnapshot()
      expect(artifact.cache).toMatchSnapshot()
    })
  })

  it('module map matches snapshot', async () => {
    const artifact = await readJson(
      join(
        process.cwd(),
        'examples/babel/.budfiles/bud-modules.json',
      ),
    )

    expect(artifact.chunks).toMatchSnapshot({
      byName: {
        app: expect.any(Number),
      },
      bySource: {
        '0 app': expect.any(Number),
      },
      usedIds: [expect.any(Number)],
    })
  })
})
