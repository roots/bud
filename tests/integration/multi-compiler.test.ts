import {beforeAll, describe, it} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

const theme = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      name: 'multi-compiler',
      dist: 'dist/theme',
      with: pacman,
    }).setup()
  })

  describe('theme.js', () => {
    it('has contents', () => {
      expect(project.assets['theme.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['theme.js'].includes('import')).toBeFalsy()
    })
  })

  describe('manifest.json', () => {
    it('matches snapshot', () => {
      expect(project.manifest).toMatchSnapshot()
    })
  })
}

const plugin = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      name: 'multi-compiler',
      dist: 'dist/plugin',
      with: pacman,
    }).setup()
  })

  describe('plugin.js', () => {
    it('has contents', () => {
      expect(project.assets['plugin.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['plugin.js'].includes('import')).toBeFalsy()
    })
  })

  describe('manifest.json', () => {
    it('matches snapshot', () => {
      expect(project.manifest).toMatchSnapshot()
    })
  })
}

describe('multi-compiler theme', () => {
  describe('npm', theme('npm'))
  describe('yarn', theme('yarn'))
})

describe('multi-compiler plugin', () => {
  describe('npm', plugin('npm'))
  describe('yarn', plugin('yarn'))
})
