import {config, error, log, success} from '../util'
import execa from 'execa'
import {readFile, readJson, writeFile} from 'fs-extra'
import {format} from 'prettier'

const NAME = 'sage'
const SAGE_DIR = process.cwd().concat('/examples/sage')

const CONFIG = {
  ...config,
  location: {
    ...config.location,
    project: SAGE_DIR,
  },
}
const EXECA_OPT = {
  cwd: CONFIG.location.project,
}
const projectFile = (file: string) =>
  `${CONFIG.location.project}/${file}`

describe('examples', () => {
  describe(NAME, () => {
    const packageJson = projectFile('package.json')

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
        return
      }

      success(NAME, 'yarn bud init')
    })

    afterAll(async () => {
      await writeFile(
        packageJson,
        format(
          `
          {
            name: "example-sage",
            private: true,
            browserslist: ["extends @wordpress/browserslist-config"],
            devDependencies: {
              "@roots/bud": "workspace:*",
              "@roots/bud-cli": "workspace:*",
              "@roots/sage": "workspace:*",
            },
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
      const entrypointsJson = projectFile(
        'public/entrypoints.json',
      )

      let entrypoints: {
        [key: string]: {
          js?: string[]
          css?: string[]
          dependencies?: string[]
        }
      }

      beforeAll(async () => {
        entrypoints = await readJson(entrypointsJson)
      })

      describe('entrypoints.json', () => {
        it('has expected app entries', () => {
          expect(entrypoints.app.js).toBeInstanceOf(Array)
          expect(entrypoints.app.js).toHaveLength(2)
          expect(entrypoints.app.css).toBeInstanceOf(Array)
          expect(entrypoints.app.css).toHaveLength(1)
          expect(entrypoints.app.dependencies).toEqual([])
        })

        it('has expected editor entries', () => {
          expect(entrypoints.editor.js).toBeInstanceOf(Array)
          expect(entrypoints.editor.js).toHaveLength(2)
          expect(entrypoints.editor.css).toBeInstanceOf(Array)
          expect(entrypoints.editor.css).toHaveLength(1)
          expect(entrypoints.editor.dependencies).toEqual([
            'wp-edit-post',
            'wp-dom-ready',
            'wp-blocks',
          ])
        })

        it('has expected customizer entries', () => {
          expect(entrypoints.customizer.js).toBeInstanceOf(Array)
          expect(entrypoints.customizer.js).toHaveLength(2)
          expect(entrypoints.customizer.dependencies).toEqual([
            'jquery',
          ])
        })
      })

      describe('app', () => {
        let runtime: Buffer, js: Buffer, css: Buffer

        beforeAll(async () => {
          runtime = await readFile(
            projectFile(`/${entrypoints.app.js.shift()}`),
          )
          js = await readFile(
            projectFile(`/${entrypoints.app.js.pop()}`),
          )
          css = await readFile(
            projectFile(`/${entrypoints.app.css.pop()}`),
          )
        })

        it('runtime is readable', () => {
          expect(runtime).toBeInstanceOf(Buffer)
        })
        it('runtime has contents', () => {
          expect(runtime.toString().length).toBeGreaterThan(10)
        })
        it('runtime is transpiled', () => {
          expect(runtime.toString().includes('import')).toBe(
            false,
          )
        })
        it('runtime whitespace removed', () => {
          expect(runtime.toString().match(/  /)).toBeFalsy()
        })
        it('runtime breaks removed', () => {
          expect(runtime.toString().match(/\\n/)).toBeFalsy()
        })

        it('js is readable', () => {
          expect(js).toBeInstanceOf(Buffer)
        })
        it('js has contents', () => {
          expect(js.toString().length).toBeGreaterThan(10)
        })
        it('js is transpiled', () => {
          expect(js.toString().includes('import')).toBe(false)
        })
        it('js whitespace removed', () => {
          expect(js.toString().match(/  /)).toBeFalsy()
        })
        it('js breaks removed', () => {
          expect(js.toString().match(/\\n/)).toBeFalsy()
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
        it('css uses relative publicPath', () => {
          expect(
            css
              .toString()
              .match(/background:url\(assets\/image\./),
          ).toBeTruthy()
        })
        it('css whitespace removed', () => {
          expect(css.toString().match(/    /)).toBeFalsy()
        })
        it('css breaks removed', () => {
          expect(css.toString().match(/\\n/)).toBeFalsy()
        })
      })

      describe('editor', () => {
        let runtime: Buffer, js: Buffer, css: Buffer

        beforeAll(async () => {
          runtime = await readFile(
            projectFile(`/${entrypoints.editor.js.shift()}`),
          )
          js = await readFile(
            projectFile(`/${entrypoints.editor.js.pop()}`),
          )
          css = await readFile(
            projectFile(`/${entrypoints.editor.css.pop()}`),
          )
        })

        it('runtime is readable', () => {
          expect(runtime).toBeInstanceOf(Buffer)
        })
        it('runtime has contents', () => {
          expect(runtime.toString().length).toBeGreaterThan(10)
        })
        it('runtime is transpiled', () => {
          expect(runtime.toString().includes('import')).toBe(
            false,
          )
        })
        it('runtime whitespace removed', () => {
          expect(runtime.toString().match(/  /)).toBeFalsy()
        })
        it('runtime breaks removed', () => {
          expect(runtime.toString().match(/\\n/)).toBeFalsy()
        })

        it('js is readable', () => {
          expect(js).toBeInstanceOf(Buffer)
        })
        it('js has contents', () => {
          expect(js.toString().length).toBeGreaterThan(10)
        })
        it('js is transpiled', () => {
          expect(js.toString().includes('import')).toBe(false)
        })
        it('js whitespace removed', () => {
          expect(js.toString().match(/  /)).toBeFalsy()
        })
        it('js breaks removed', () => {
          expect(js.toString().match(/\\n/)).toBeFalsy()
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

      describe('customizer', () => {
        let runtime: Buffer, js: Buffer

        beforeAll(async () => {
          runtime = await readFile(
            projectFile(`/${entrypoints.customizer.js.shift()}`),
          )
          js = await readFile(
            projectFile(`/${entrypoints.customizer.js.pop()}`),
          )
        })

        it('runtime is readable', () => {
          expect(runtime).toBeInstanceOf(Buffer)
        })
        it('runtime has contents', () => {
          expect(runtime.toString().length).toBeGreaterThan(10)
        })
        it('runtime is transpiled', () => {
          expect(runtime.toString().includes('import')).toBe(
            false,
          )
        })
        it('runtime whitespace removed', () => {
          expect(runtime.toString().match(/  /)).toBeFalsy()
        })
        it('runtime breaks removed', () => {
          expect(runtime.toString().match(/\\n/)).toBeFalsy()
        })

        it('js is readable', () => {
          expect(js).toBeInstanceOf(Buffer)
        })
        it('js has contents', () => {
          expect(js.toString().length).toBeGreaterThan(10)
        })
        it('js is transpiled', () => {
          expect(js.toString().includes('import')).toBe(false)
        })
        it('js whitespace removed', () => {
          expect(js.toString().match(/  /)).toBeFalsy()
        })
        it('js breaks removed', () => {
          expect(js.toString().match(/\\n/)).toBeFalsy()
        })
      })
    })
  })
})
