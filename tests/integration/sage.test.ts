import {readJson} from 'fs-extra'
import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/sage', () => {
  let project: Project
  let entrypoints: any

  beforeAll(async () => {
    project = new Project({
      name: 'sage',
      dir: 'examples/sage',
      public: 'public',
    })

    entrypoints = await readJson(
      project.distPath('entrypoints.json'),
    )

    await project.setup()
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
      expect(
        project.assets['runtime.js'].length,
      ).toBeGreaterThan(10)
    })
    it('is transpiled', () => {
      expect(
        project.assets['runtime.js'].includes('import'),
      ).toBeFalsy()
    })
  })

  describe('app', () => {
    it('has contents', () => {
      expect(project.assets['app.js'].length).toBeGreaterThan(10)
    })
    it('is transpiled', () => {
      expect(
        project.assets['app.js'].includes('import'),
      ).toBeFalsy()
    })
    it('css: has contents', () => {
      expect(project.assets['app.css'].length).toBeGreaterThan(
        10,
      )
    })
    it('css: is transpiled', () => {
      expect(project.assets['app.css'].includes('@import')).toBe(
        false,
      )
    })
    it('css: @tailwind directive is transpiled', () => {
      expect(project.assets['app.css'].includes('@apply')).toBe(
        false,
      )
    })
    it('css: has whitespace removed', () => {
      expect(project.assets['app.css'].match(/    /)).toBeFalsy()
    })
    it('css: has breaks removed', () => {
      expect(project.assets['app.css'].match(/\\n/)).toBeFalsy()
    })
  })

  describe('editor', () => {
    it('has contents', () => {
      expect(project.assets['editor.js'].length).toBeGreaterThan(
        10,
      )
    })
    it('is transpiled', () => {
      expect(
        project.assets['editor.js'].includes('import'),
      ).toBeFalsy()
    })
    it('css: has contents', () => {
      expect(
        project.assets['editor.css'].length,
      ).toBeGreaterThan(10)
    })
    it('css: is transpiled', () => {
      expect(
        project.assets['editor.css'].includes('@import'),
      ).toBe(false)
    })
    it('css: @tailwind directive is transpiled', () => {
      expect(
        project.assets['editor.css'].includes('@apply'),
      ).toBe(false)
    })
    it('css: has whitespace removed', () => {
      expect(
        project.assets['editor.css'].match(/    /),
      ).toBeFalsy()
    })
    it('css: has breaks removed', () => {
      expect(
        project.assets['editor.css'].match(/\\n/),
      ).toBeFalsy()
    })
  })

  describe('customizer', () => {
    it('has contents', () => {
      expect(
        project.assets['customizer.js'].length,
      ).toBeGreaterThan(10)
    })
    it('is transpiled', () => {
      expect(
        project.assets['customizer.js'].includes('import'),
      ).toBeFalsy()
    })
  })

  describe('snapshots', () => {
    it('package.json is unchanged', async () => {
      expect(project.packageJson).toMatchSnapshot()
    })

    it('public/manifest.json matches expectations', async () => {
      expect(Object.entries(project.manifest).length).toEqual(8)

      expect(
        Object.values<string>(project.manifest).filter(
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
      ).toBe(Object.values(project.manifest).length)

      expect(project.manifest['app.js']).toMatch(
        /app\.[\d|\w]*\.js/,
      )
      expect(project.manifest['app.css']).toMatch(
        /app\.[\d|\w]*\.css/,
      )
      expect(project.manifest['editor.js']).toMatch(
        /editor\.[\d|\w]*\.js/,
      )
      expect(project.manifest['editor.css']).toMatch(
        /editor\.[\d|\w]*\.css/,
      )
      expect(project.manifest['customizer.js']).toMatch(
        /customizer\.[\d|\w]*\.js/,
      )
      expect(project.manifest['runtime.js']).toMatch(
        /runtime\.[\d|\w]*\.js/,
      )

      expect(Object.keys(project.manifest)).toMatchSnapshot()
    })

    it('.budfiles/bud.webpack.config.js', async () => {
      expect(project.webpackConfig.name).toMatchSnapshot()
      expect(project.webpackConfig.entry).toMatchSnapshot()
      expect(project.webpackConfig.mode).toMatchSnapshot()
      expect(
        project.webpackConfig.optimization,
      ).toMatchSnapshot()
      expect(project.webpackConfig.bail).toMatchSnapshot()
      expect(project.webpackConfig.cache).toMatchSnapshot()
    })

    it('module map matches snapshot', async () => {
      expect(project.modules.chunks).toMatchSnapshot({
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
