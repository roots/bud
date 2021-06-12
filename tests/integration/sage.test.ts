import {helper, Assets, Entrypoints} from '../util/integration'
import {readJson} from 'fs-extra'

const suite = helper('sage', 'examples/sage', 'public', 'public')

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
})
