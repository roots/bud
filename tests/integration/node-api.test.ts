import {execa} from '@roots/bud-support'
import fs from 'fs-extra'
import {join} from 'path'

jest.setTimeout(60000)

describe.skip('node-api', () => {
  beforeAll(async () => {
    await execa.execa('yarn', ['webpack'], {
      cwd: `${process.cwd()}/examples/node-api`,
    })
  })

  describe('snapshots', () => {
    it('package.json', async () => {
      const artifact = (
        await fs.readFile(
          join(process.cwd(), 'examples/node-api/package.json'),
          'utf8',
        )
      ).toString()

      expect(artifact).toMatchSnapshot()
    })

    it('dist/manifest.json', async () => {
      const artifact = await fs.readFile(
        join(process.cwd(), 'examples/node-api/dist/manifest.json'),
      )

      expect(artifact.toString()).toMatchSnapshot()
    })

    it('dist/app.js', async () => {
      const artifact = await fs.readFile(
        join(process.cwd(), 'examples/node-api/dist/app.js'),
      )

      expect(artifact.toString()).toMatchSnapshot()
    })

    it('.budfiles/bud.webpack.config.js', async () => {
      const artifact = (
        await import(
          join(
            process.cwd(),
            'examples/node-api/.budfiles/bud.webpack.config.js',
          )
        )
      ).default()

      expect(artifact.entry).toMatchSnapshot()
      expect(artifact.mode).toMatchSnapshot()
      expect(artifact.optimization).toMatchSnapshot()
      expect(artifact.bail).toMatchSnapshot()
      expect(artifact.cache).toMatchSnapshot()
    })
  })
})
