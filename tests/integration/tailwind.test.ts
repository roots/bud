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
    jest.setTimeout(1000000)

    let packageJson: string,
      manifest: {[key: string]: string},
      js: Buffer,
      css: Buffer

    beforeAll(async () => {
      packageJson = projectPath('package.json')
      log(NAME, 'yarn bud init')

      const {exitCode, stderr} = await execa(
        'yarn',
        ['bud', 'init'],
        EXECA_OPT,
      )

      if (exitCode !== 0) {
        error(NAME, 'yarn bud init', stderr)
        return
      }

      success(NAME, 'yarn bud init')

      manifest = await readJson(distPath('manifest.json'))
      js = await readFile(distPath('app.js'))
      css = await readFile(distPath('app.css'))

      return
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

    describe('builds the project files', () => {
      beforeAll(async () => {
        log(NAME, 'yarn bud build --ci --debug')

        const {stdout, stderr, exitCode} = await execa(
          'yarn',
          ['bud', 'build', '--ci', '--debug'],
          EXECA_OPT,
        )

        if (exitCode !== 0) {
          error(NAME, 'build error', {stderr, stdout})
          return
        }

        success(NAME, 'build complete')
        expect(exitCode).toEqual(0)
      })

      it('has expected manifest entries', () => {
        expect(manifest['app.js']).toBe('/app.js')
      })

      describe('app', () => {
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
