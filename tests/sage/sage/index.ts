import {
  Framework,
  setupBud,
  teardownBud,
  config,
  error,
  log,
  success,
} from '../../util'
import * as sage from '@roots/sage'
import execa from 'execa'
import {readFile, readJson, writeFile} from 'fs-extra'
import {format} from 'prettier'

const SAGE_DIR = process.cwd().concat('/examples/sage')
const EXAMPLES_SAGE_CONFIG = {
  ...config,
  location: {
    ...config.location,
    project: SAGE_DIR,
  },
}
const EXECA_OPT = {
  cwd: EXAMPLES_SAGE_CONFIG.location.project,
}

const projectFile = (file: string) =>
  `${EXAMPLES_SAGE_CONFIG.location.project}/${file}`

describe('@roots/sage', () => {
  describe('settings', () => {
    let bud: Framework = null
    let bootSpy = jest.spyOn(sage, 'boot')

    beforeAll(done => {
      bud = setupBud('development', EXAMPLES_SAGE_CONFIG)
      bud.use(sage)
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('extension has name prop', () => {
      expect(sage.name).toBe('@roots/sage')
    })

    it('extension boot method was called', () => {
      expect(bootSpy).toHaveBeenCalled()
    })

    it('has expected paths', () => {
      expect(bud.path('storage')).toEqual(
        SAGE_DIR.concat('/storage/bud'),
      )
      expect(bud.publicPath()).toEqual('public/')
      expect(bud.path('dist')).toEqual(
        SAGE_DIR.concat('/public'),
      )
      expect(bud.path('src')).toEqual(
        SAGE_DIR.concat('/resources'),
      )
    })

    it('has expected aliases', () => {
      const {alias: aliases} = bud.build.config.resolve

      bud.use(sage)

      expect(aliases['@fonts']).toEqual(
        SAGE_DIR.concat('/resources/fonts'),
      )
      expect(aliases['@images']).toEqual(
        SAGE_DIR.concat('/resources/images'),
      )
      expect(aliases['@scripts']).toEqual(
        SAGE_DIR.concat('/resources/scripts'),
      )
      expect(aliases['@styles']).toEqual(
        SAGE_DIR.concat('/resources/styles'),
      )
    })
  })

  describe('react', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud('development', EXAMPLES_SAGE_CONFIG)
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('not used when peer deps are missing', done => {
      bud.use(sage)
      expect(bud.extensions.has('@roots/bud-react')).toEqual(
        false,
      )

      done()
    })

    it('used when peer deps present', done => {
      bud.discovery.set('dependencies.react', '^17')
      bud.use(sage)

      expect(bud.extensions.has('@roots/bud-react')).toEqual(
        true,
      )

      done()
    })
  })

  describe('postcss', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud('development', EXAMPLES_SAGE_CONFIG)
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('not used when peer deps are missing', done => {
      bud.use(sage)
      expect(bud.extensions.has('@roots/bud-postcss')).toEqual(
        false,
      )
      done()
    })

    it('used when peer deps present', done => {
      bud.discovery.set('devDependencies.postcss', '*')
      bud.use(sage)
      expect(bud.extensions.has('@roots/bud-postcss')).toEqual(
        true,
      )
      done()
    })
  })

  describe('tailwindcss', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud('development', EXAMPLES_SAGE_CONFIG)
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('not used when peer deps are missing', done => {
      bud.use(sage)
      expect(
        bud.extensions.has('@roots/bud-tailwindcss'),
      ).toEqual(false)
      done()
    })

    it('used when peer deps present', done => {
      bud.discovery.set('devDependencies.tailwindcss', '*')
      bud.use(sage)
      expect(
        bud.extensions.has('@roots/bud-tailwindcss'),
      ).toEqual(true)
      done()
    })
  })

  describe('typescript', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud('development', EXAMPLES_SAGE_CONFIG)
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('not used when peer deps are missing', done => {
      bud.use(sage)
      expect(
        bud.extensions.has('@roots/bud-typescript'),
      ).toEqual(false)
      done()
    })

    it(`used when peer deps are present`, done => {
      bud.discovery.set('devDependencies.typescript', '*')
      bud.use(sage)
      expect(
        bud.extensions.has('@roots/bud-typescript'),
      ).toEqual(true)
      done()
    })
  })

  describe('esbuild', () => {
    let bud: Framework = null

    beforeAll(done => {
      bud = setupBud('production', EXAMPLES_SAGE_CONFIG)
      done()
    })

    afterAll(done => {
      bud = teardownBud(bud)
      done()
    })

    it('is used', done => {
      bud.use(sage)
      expect(bud.extensions.has('@roots/bud-esbuild')).toEqual(
        true,
      )
      done()
    })
  })

  describe('examples/sage', () => {
    const packageJson = projectFile('package.json')

    jest.setTimeout(1000000)

    beforeAll(async () => {
      log('examples/sage', 'yarn bud init')

      const {exitCode, stderr} = await execa(
        'yarn',
        ['bud', 'init'],
        EXECA_OPT,
      )

      if (exitCode !== 0) {
        error('examples/sage', 'yarn bud init', stderr)
      } else {
        success('examples/sage', 'yarn bud init')
      }
    })

    afterAll(async () => {
      await writeFile(
        packageJson,
        format(
          `{
        name: 'example-sage',
        private: true,
        browserslist: ['extends @wordpress/browserslist-config'],
        devDependencies: {
          '@roots/bud': 'workspace:*',
          '@roots/bud-cli': 'workspace:*',
          '@roots/sage': 'workspace:*',
        },
      }`,
          {parser: 'json'},
        ),
      )
    })

    it('builds the project files', async () => {
      log('examples/sage', 'yarn bud build --ci')

      const {stderr, exitCode} = await execa(
        'yarn',
        ['bud', 'build', '--ci'],
        EXECA_OPT,
      )

      if (exitCode !== 0) {
        error('examples/sage', 'build error', stderr)
      } else {
        success('examples/sage', 'build complete')
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
