import {beforeAll, describe, it} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: '@examples/babel',
      with: pacman,
    }).setup()
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(project.assets['app.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['app.js'].includes('import')).toBeFalsy()
    })
  })

  describe('manifest.json', () => {
    it('matches snapshot', () => {
      expect(project.manifest).toMatchSnapshot()
    })
  })
}

describe('babel', () => {
  describe('npm', run('npm'))
  describe('yarn', run('yarn'))
})
