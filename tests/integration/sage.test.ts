import {beforeAll, describe, it} from '@jest/globals'
import {log} from '@repo/logger'
import {Project} from '@repo/test-kit/project'

const test = (pacman: 'yarn' | 'npm') => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      name: 'sage',
      dist: 'public',
      with: pacman,
    }).setup()

    log(project.entrypoints)
  })

  describe('entrypoints.json', () => {
    it('has expected app entries', () => {
      expect(project.entrypoints['app/entry'].css).toBeInstanceOf(Array)
      expect(project.entrypoints['app/entry'].css).toHaveLength(1)
      expect(project.entrypoints['app/entry'].dependencies).toEqual([])
    })

    it('has expected editor entries', () => {
      expect(project.entrypoints['editor/entry'].css).toBeInstanceOf(Array)
      expect(project.entrypoints['editor/entry'].css).toHaveLength(1)
    })
  })

  describe('runtime', () => {
    it('has contents', () => {
      expect(project.assets['runtime.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['runtime.js'].includes('import')).toBeFalsy()
    })
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(project.assets['app/entry.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['app/entry.js'].includes('import')).toBeFalsy()
    })
  })

  describe('app/entry.css', () => {
    it('has contents', () => {
      expect(project.assets['app/entry.css'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['app/entry.css'].includes('@import')).toBe(
        false,
      )
    })

    it('@tailwind directive is transpiled', () => {
      expect(project.assets['app/entry.css'].includes('@apply')).toBe(
        false,
      )
    })

    it('has whitespace removed', () => {
      expect(project.assets['app/entry.css'].match(/    /)).toBeFalsy()
    })

    it('has breaks removed', () => {
      expect(project.assets['app/entry.css'].match(/\\n/)).toBeFalsy()
    })
  })

  it('[editor] is not defined', () => {
    expect(project.assets['editor/entry.js']).toBeUndefined()
  })

  it('[editor] css: has contents', () => {
    expect(project.assets['editor/entry.css'].length).toBeGreaterThan(10)
  })

  it('[editor] css: is transpiled', () => {
    expect(project.assets['editor/entry.css'].includes('@import')).toBe(
      false,
    )
  })

  it('[editor] css: @tailwind directive is transpiled', () => {
    expect(project.assets['editor/entry.css'].includes('@apply')).toBe(
      false,
    )
  })

  it('[editor] css: has whitespace removed', () => {
    expect(project.assets['editor/entry.css'].match(/    /)).toBeFalsy()
  })

  it('[editor] css: has breaks removed', () => {
    expect(project.assets['editor/entry.css'].match(/\\n/)).toBeFalsy()
  })

  it('[snapshots] package.json is unchanged', async () => {
    expect(project.packageJson).toMatchSnapshot()
  })

  it('[snapshots] public/manifest.json matches expectations', async () => {
    expect(project.manifest['app/entry.js']).toMatch(
      /app\/entry\.[\d|\w]*\.js/,
    )
    expect(project.manifest['app/entry.css']).toMatch(
      /app\/entry\.[\d|\w]*\.css/,
    )
    expect(project.manifest['editor/entry.css']).toMatch(
      /editor\/entry\.[\d|\w]*\.css/,
    )
    expect(project.manifest['runtime.js']).toMatch(/runtime\.[\d|\w]*\.js/)
  })

  it('[snapshots] module map matches snapshot', async () => {
    expect(project.modules.chunks).toMatchSnapshot({
      byName: {
        runtime: expect.any(Number),
      },
      bySource: {
        '0 app/entry': expect.any(Number),
        '0 editor/entry': expect.any(Number),
        '1 app/entry': expect.any(Number),
        '1 editor/entry': expect.any(Number),
      },
      usedIds: [
        expect.any(Number),
        expect.any(Number),
        expect.any(Number),
      ],
    })
  })
}

describe('sage', () => {
  describe('npm', test('npm'))
  describe('yarn', test('yarn'))
})
