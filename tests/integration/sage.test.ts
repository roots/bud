import {beforeAll, describe, it} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

const test = (pacman: 'yarn' | 'npm') => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      name: 'sage',
      dist: 'public',
      with: pacman,
    }).setup()
  })

  describe('entrypoints.json', () => {
    it('has expected app entries', () => {
      expect(project.entrypoints['app'].css).toBeInstanceOf(Array)
      expect(project.entrypoints['app'].css).toHaveLength(1)
      expect(project.entrypoints['app'].dependencies).toEqual([])
    })

    it('has expected editor entries', () => {
      expect(project.entrypoints['editor'].css).toBeInstanceOf(Array)
      expect(project.entrypoints['editor'].css).toHaveLength(1)
    })
  })

  describe('runtime', () => {
    it('has contents', () => {
      expect(project.assets['runtime.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['runtime.js'].includes('import ')).toBeFalsy()
    })
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(project.assets['app.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['app.js'].includes('import ')).toBeFalsy()
    })
  })

  describe('app.css', () => {
    it('has contents', () => {
      expect(project.assets['app.css'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['app.css'].includes('@import')).toBe(false)
    })

    it('@tailwind directive is transpiled', () => {
      expect(project.assets['app.css'].includes('@apply')).toBe(false)
    })

    it('has whitespace removed', () => {
      expect(project.assets['app.css'].match(/    /)).toBeFalsy()
    })

    it('has breaks removed', () => {
      expect(project.assets['app.css'].match(/\\n/)).toBeFalsy()
    })
  })

  it('[editor] is not defined', () => {
    expect(project.assets['editor.js']).toBeUndefined()
  })

  it('[editor] css: has contents', () => {
    expect(project.assets['editor.css'].length).toBeGreaterThan(10)
  })

  it('[editor] css: is transpiled', () => {
    expect(project.assets['editor.css'].includes('@import')).toBe(false)
  })

  it('[editor] css: @tailwind directive is transpiled', () => {
    expect(project.assets['editor.css'].includes('@apply')).toBe(false)
  })

  it('[editor] css: has whitespace removed', () => {
    expect(project.assets['editor.css'].match(/    /)).toBeFalsy()
  })

  it('[editor] css: has breaks removed', () => {
    expect(project.assets['editor.css'].match(/\\n/)).toBeFalsy()
  })

  it('[snapshots] package.json is unchanged', async () => {
    expect(project.packageJson).toMatchSnapshot()
  })

  it('[snapshots] public/manifest.json matches expectations', async () => {
    expect(project.manifest['app.js']).toMatch(/js\/app\.[\d|\w]*\.js/)
    expect(project.manifest['app.css']).toMatch(/css\/app\.[\d|\w]*\.css/)
    expect(project.manifest['editor.css']).toMatch(
      /css\/editor\.[\d|\w]*\.css/,
    )
    expect(project.manifest['runtime.js']).toMatch(
      /js\/runtime\.[\d|\w]*\.js/,
    )
  })

  it('[snapshots] module map matches snapshot', async () => {
    expect(project.modules).toMatchSnapshot(
      expect.objectContaining({
        byName: expect.objectContaining({
          runtime: expect.any(Number),
        }),
        bySource: expect.objectContaining({
          '0 app': expect.any(Number),
          '0 editor': expect.any(Number),
          '1 app': expect.any(Number),
          '1 editor': expect.any(Number),
        }),
        usedIds: expect.arrayContaining([
          expect.any(Number),
          expect.any(Number),
          expect.any(Number),
        ]),
      }),
    )
  })
}

describe('sage', () => {
  describe('npm', test('npm'))
  describe('yarn', test('yarn'))
})
