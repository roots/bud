import {config, error, log, success} from '../util'
import execa from 'execa'
import {readFile, readJson, writeFile} from 'fs-extra'
import {format} from 'prettier'

const NAME = 'tailwindcss'
const DIR = process.cwd().concat('/examples/tailwindcss')

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
            "name": "example-tailwindcss",
            "private": true,
            "devDependencies": {
              "@roots/bud": "workspace:*",
              "@roots/bud-babel": "workspace:*",
              "@roots/bud-cli": "workspace:*",
              "@roots/bud-framework": "workspace:*",
              "@roots/bud-postcss": "workspace:*",
              "@roots/bud-tailwindcss": "workspace:*"
            }
          }          
          `,
          {parser: 'json'},
        ),
      )
    })

    it('builds the project files', async () => {
      log(NAME, 'yarn bud build --ci --debug')

      const {stderr, exitCode} = await execa(
        'yarn',
        ['bud', 'build', '--ci', '--debug'],
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
      let manifest: {[key: string]: string}

      beforeAll(async () => {
        manifest = await readJson(
          projectPath('dist/manifest.json'),
        )
      })

      describe('manifest.json', () => {
        it('has expected entries', () => {
          expect(manifest['app.js']).toBe('/app.js')
        })
      })

      describe('app', () => {
        let js: Buffer, css: Buffer

        beforeAll(async () => {
          js = await readFile(distPath(manifest['app.js']))
          css = await readFile(distPath(manifest['app.css']))
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

        it('css is readable', () => {
          expect(css).toBeInstanceOf(Buffer)
        })
        it('css has contents', () => {
          expect(css.toString().length).toBeGreaterThan(10)
        })
        it('css is transpiled', () => {
          expect(css.toString().includes('@import')).toBe(false)
        })
        it('@tailwind directive is transpiled', () => {
          expect(css.toString().includes('@tailwindcss')).toBe(
            false,
          )
        })
        it('css whitespace removed', () => {
          expect(css.toString().match(/    /)).toBeFalsy()
        })
        it('css breaks removed', () => {
          expect(css.toString().match(/\\n/)).toBeFalsy()
        })
      })
    })
  })
})
