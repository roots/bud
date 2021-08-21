import {readJson} from 'fs-extra'
import {join} from 'path'

import {Assets, Entrypoints, helper} from '../util/integration'

const suite = helper(
  'sage',
  'examples/sage',
  'public',
  '/app/themes/sage/public/',
)

jest.setTimeout(1000000)

describe(suite.name, () => {
  let assets: Assets
  let entrypoints: Entrypoints

  beforeAll(async () => {
    assets = await suite.setup()
    entrypoints = await readJson(
      suite.distPath('entrypoints.json'),
    )

    return
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

  describe('runtime', () => {
    it('has contents', () => {
      expect(assets['runtime.js'].length).toBeGreaterThan(10)
    })
    it('is transpiled', () => {
      expect(assets['runtime.js'].includes('import')).toBeFalsy()
    })
  })

  describe('app', () => {
    it('has contents', () => {
      expect(assets['app.js'].length).toBeGreaterThan(10)
    })
    it('is transpiled', () => {
      expect(assets['app.js'].includes('import')).toBeFalsy()
    })
    it('css: has contents', () => {
      expect(assets['app.css'].length).toBeGreaterThan(10)
    })
    it('css: is transpiled', () => {
      expect(assets['app.css'].includes('@import')).toBe(false)
    })
    it('css: @tailwind directive is transpiled', () => {
      expect(assets['app.css'].includes('@apply')).toBe(false)
    })
    it('css: has whitespace removed', () => {
      expect(assets['app.css'].match(/    /)).toBeFalsy()
    })
    it('css: has breaks removed', () => {
      expect(assets['app.css'].match(/\\n/)).toBeFalsy()
    })
  })

  describe('editor', () => {
    it('has contents', () => {
      expect(assets['editor.js'].length).toBeGreaterThan(10)
    })
    it('is transpiled', () => {
      expect(assets['editor.js'].includes('import')).toBeFalsy()
    })
    it('css: has contents', () => {
      expect(assets['editor.css'].length).toBeGreaterThan(10)
    })
    it('css: is transpiled', () => {
      expect(assets['editor.css'].includes('@import')).toBe(
        false,
      )
    })
    it('css: @tailwind directive is transpiled', () => {
      expect(assets['editor.css'].includes('@apply')).toBe(false)
    })
    it('css: has whitespace removed', () => {
      expect(assets['editor.css'].match(/    /)).toBeFalsy()
    })
    it('css: has breaks removed', () => {
      expect(assets['editor.css'].match(/\\n/)).toBeFalsy()
    })
  })

  describe('customizer', () => {
    it('has contents', () => {
      expect(assets['customizer.js'].length).toBeGreaterThan(10)
    })
    it('is transpiled', () => {
      expect(
        assets['customizer.js'].includes('import'),
      ).toBeFalsy()
    })
  })

  describe('snapshots', () => {
    it('package.json is unchanged', async () => {
      const artifact = await readJson(
        join(process.cwd(), 'examples/sage/package.json'),
      )

      expect(artifact).toMatchSnapshot()
    })

    it('public/manifest.json matches expectations', async () => {
      const artifact = await readJson(
        join(
          process.cwd(),
          'examples/sage/public/manifest.json',
        ),
      )

      expect(Object.entries(artifact).length).toEqual(8)

      expect(
        Object.values<string>(artifact).filter(
          v =>
            (v.startsWith('assets/') ||
              v.startsWith('images/') ||
              v.startsWith('app') ||
              v.startsWith('editor') ||
              v.startsWith('runtime') ||
              v.startsWith('customizer')) &&
            (v.endsWith('.js') ||
              v.endsWith('.css') ||
              v.endsWith('.jpeg')),
        ).length,
      ).toBe(Object.values(artifact).length)

      expect(artifact['app.js']).toMatch(/app\.[\d|\w]*\.js/)
      expect(artifact['app.css']).toMatch(/app\.[\d|\w]*\.css/)
      expect(artifact['editor.js']).toMatch(
        /editor\.[\d|\w]*\.js/,
      )
      expect(artifact['editor.css']).toMatch(
        /editor\.[\d|\w]*\.css/,
      )
      expect(artifact['customizer.js']).toMatch(
        /customizer\.[\d|\w]*\.js/,
      )
      expect(artifact['runtime.js']).toMatch(
        /runtime\.[\d|\w]*\.js/,
      )

      expect(Object.keys(artifact)).toMatchSnapshot()
    })

    it('.budfiles/bud.webpack.config.js', async () => {
      const artifact = await import(
        join(
          process.cwd(),
          'examples/sage/storage/bud/bud.webpack.config.js',
        )
      ).then(artifact => artifact())

      expect(artifact.name).toMatchSnapshot()
      expect(artifact.entry).toMatchSnapshot()
      expect(artifact.mode).toMatchSnapshot()
      expect(artifact.optimization).toMatchSnapshot()
      expect(artifact.bail).toMatchSnapshot()
      expect(artifact.cache).toMatchSnapshot()
    })

    it('module map matches snapshot', async () => {
      const artifact = await readJson(
        join(
          process.cwd(),
          'examples/sage/storage/bud/bud-modules.json',
        ),
      )

      expect(artifact.chunks).toMatchSnapshot({
        byName: {
          app: expect.any(Number),
          customizer: expect.any(Number),
          editor: expect.any(Number),
          runtime: expect.any(Number),
        },
        bySource: {
          '0 app': expect.any(Number),
          '0 customizer': expect.any(Number),
          '0 editor': expect.any(Number),
          '1 app': expect.any(Number),
          '1 customizer': expect.any(Number),
          '1 editor': expect.any(Number),
        },
        usedIds: [
          expect.any(Number),
          expect.any(Number),
          expect.any(Number),
          expect.any(Number),
        ],
      })
    })
  })
})
