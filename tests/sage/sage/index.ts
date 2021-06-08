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
import {readFile, readJson, writeJson} from 'fs-extra'

const SAGE_DIR = process.cwd().concat('/examples/sage')
const EXAMPLES_SAGE_CONFIG = {
  ...config,
  location: {
    ...config.location,
    project: SAGE_DIR,
  },
}

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
    const packageJson =
      EXAMPLES_SAGE_CONFIG.location.project.concat(
        '/package.json',
      )

    jest.setTimeout(1000000)

    beforeAll(async () => {
      log('examples/sage', 'yarn bud init')

      const res = await execa('yarn', ['bud', 'init'], {
        cwd: EXAMPLES_SAGE_CONFIG.location.project,
      })

      if (res.exitCode !== 0) {
        error('examples/sage', 'yarn bud init', res.stderr)
      } else {
        success('examples/sage', 'yarn bud init')
      }
    })

    afterAll(async () => {
      await writeJson(packageJson, {
        name: 'example-sage',
        private: true,
        browserslist: ['extends @wordpress/browserslist-config'],
        devDependencies: {
          '@roots/bud': 'workspace:*',
          '@roots/bud-cli': 'workspace:*',
          '@roots/sage': 'workspace:*',
        },
      })

      log('examples/sage', 'restoring lockfile')

      const res = await execa('yarn', {
        cwd: EXAMPLES_SAGE_CONFIG.location.project,
      })

      if (res.exitCode !== 0) {
        error('examples/sage', 'restoring lockfile', res.stderr)
      } else {
        success('examples/sage', 'restoring lockfile')
      }
    })

    it('builds the project files', async () => {
      log('examples/sage', 'yarn bud build --ci')

      const res = await execa('yarn', ['bud', 'build', '--ci'], {
        cwd: EXAMPLES_SAGE_CONFIG.location.project,
      })

      if (res.exitCode !== 0) {
        error('examples/sage', 'build error', res.stderr)
      } else {
        success('examples/sage', 'build complete')
      }

      expect(res.exitCode).toEqual(0)
    })

    describe('output', () => {
      const entrypointsJson =
        EXAMPLES_SAGE_CONFIG.location.project.concat(
          '/public/entrypoints.json',
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
        it('runtime seems okay', async () => {
          const asset = await readFile(
            EXAMPLES_SAGE_CONFIG.location.project.concat(
              `/${entrypoints.app.js.shift()}`,
            ),
          )

          expect(asset).toBeInstanceOf(Buffer)
          expect(asset.toString().length).toBeGreaterThan(10)
          expect(asset.toString().includes('import')).toBe(false)
        })

        it('js seems okay', async () => {
          const asset = await readFile(
            EXAMPLES_SAGE_CONFIG.location.project.concat(
              `/${entrypoints.app.js.pop()}`,
            ),
          )

          expect(asset).toBeInstanceOf(Buffer)
          expect(asset.toString().length).toBeGreaterThan(10)
          expect(asset.toString().includes('import')).toBe(false)
        })

        it('css seems okay', async () => {
          const asset = await readFile(
            EXAMPLES_SAGE_CONFIG.location.project.concat(
              `/${entrypoints.app.css.pop()}`,
            ),
          )

          expect(asset).toBeInstanceOf(Buffer)
          expect(asset.toString().length).toBeGreaterThan(10)
          expect(asset.toString().includes('@import')).toBe(
            false,
          )
          expect(asset.toString().includes('@tailwind')).toBe(
            false,
          )
        })
      })

      describe('editor', () => {
        it('runtime seems okay', async () => {
          const asset = await readFile(
            EXAMPLES_SAGE_CONFIG.location.project.concat(
              `/${entrypoints.editor.js.shift()}`,
            ),
          )

          expect(asset).toBeInstanceOf(Buffer)
          expect(asset.toString().length).toBeGreaterThan(10)
          expect(asset.toString().includes('import')).toBe(false)
        })

        it('js seems okay', async () => {
          const asset = await readFile(
            EXAMPLES_SAGE_CONFIG.location.project.concat(
              `/${entrypoints.editor.js.pop()}`,
            ),
          )

          expect(asset).toBeInstanceOf(Buffer)
          expect(asset.toString().length).toBeGreaterThan(10)
          expect(asset.toString().includes('import')).toBe(false)
        })

        it('css seems okay', async () => {
          const asset = await readFile(
            EXAMPLES_SAGE_CONFIG.location.project.concat(
              `/${entrypoints.editor.css.pop()}`,
            ),
          )

          expect(asset).toBeInstanceOf(Buffer)
          expect(asset.toString().length).toBeGreaterThan(10)
          expect(asset.toString().includes('@import')).toBe(
            false,
          )
          expect(asset.toString().includes('@tailwind')).toBe(
            false,
          )
        })
      })

      describe('customizer', () => {
        it('runtime seems okay', async () => {
          const asset = await readFile(
            EXAMPLES_SAGE_CONFIG.location.project.concat(
              `/${entrypoints.customizer.js.shift()}`,
            ),
          )

          expect(asset).toBeInstanceOf(Buffer)
          expect(asset.toString().length).toBeGreaterThan(10)
          expect(asset.toString().includes('import')).toBe(false)
        })

        it('js seems okay', async () => {
          const asset = await readFile(
            EXAMPLES_SAGE_CONFIG.location.project.concat(
              `/${entrypoints.customizer.js.pop()}`,
            ),
          )

          expect(asset).toBeInstanceOf(Buffer)
          expect(asset.toString().length).toBeGreaterThan(10)
          expect(asset.toString().includes('import')).toBe(false)
        })
      })
    })
  })
})
