import {config, error, log, success} from '../util'
import execa from 'execa'
import {readFile, readJson, writeFile} from 'fs-extra'
import {format} from 'prettier'

const NAME = 'basic'
const DIR = process.cwd().concat('/examples/basic')
const CONFIG = {
  ...config,
  location: {
    ...config.location,
    project: DIR,
  },
}
const EXECA_OPT = {
  cwd: CONFIG.location.project,
}
const projectPath = (file: string) =>
  `${CONFIG.location.project}/${file}`
const distPath = (file: string) =>
  `${CONFIG.location.project}/dist/${file}`

describe('examples', () => {
  describe(NAME, () => {
    const packageJson = projectPath('package.json')

    jest.setTimeout(1000000)

    beforeAll(async () => {
      log(NAME, 'yarn bud init')

      const {exitCode, stderr} = await execa(
        'yarn',
        ['bud', 'init'],
        EXECA_OPT,
      )

      if (exitCode !== 0) {
        error(NAME, 'yarn bud init', stderr)
      } else {
        success(NAME, 'yarn bud init')
      }
    })

    afterAll(async () => {
      await writeFile(
        packageJson,
        format(
          `{
            "name": "example-basic",
            "private": true,
            "devDependencies": {
              "@roots/bud": "workspace:*",
              "@roots/bud-cli": "workspace:*"
            }
          }
          `,
          {parser: 'json'},
        ),
      )
    })

    it('builds the project files', async () => {
      log(NAME, 'yarn bud build --ci')

      const {stderr, exitCode} = await execa(
        'yarn',
        ['bud', 'build', '--ci'],
        EXECA_OPT,
      )

      if (exitCode !== 0) {
        error(NAME, 'build error', stderr)
      } else {
        success(NAME, 'build complete')
      }

      expect(exitCode).toEqual(0)
    })

    describe('output', () => {
      let manifest

      beforeAll(async () => {
        manifest = await readJson(
          projectPath('dist/manifest.json'),
        )
      })

      describe('manifest.json', () => {
        it('has expected entries', () => {
          expect(manifest['main.js']).toBe('/main.js')
        })
      })

      describe('app', () => {
        let js: Buffer

        beforeAll(async () => {
          js = await readFile(distPath(manifest['main.js']))
        })

        it('js is readable', () => {
          expect(js).toBeInstanceOf(Buffer)
        })
        it('js has contents', () => {
          expect(js.toString().length).toBeGreaterThan(10)
        })
        it('js is transpiled', () => {
          expect(js.toString().includes('import')).toBeFalsy()
        })
      })
    })
  })
})
