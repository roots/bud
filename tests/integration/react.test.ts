import {beforeAll, describe, it, jest} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

jest.setTimeout(60000)

const test = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      name: 'react',
      dist: 'dist',
      with: pacman,
    }).setup()
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(project.assets['app.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['app.js'].includes(`from '`)).toBeFalsy()
    })
  })

  describe('manifest.json', () => {
    it('matches snapshot', () => {
      expect(project.manifest).toMatchSnapshot()
    })
  })
}

describe('react', () => {
  describe('npm', test('npm'))
  describe('yarn', test('yarn'))
})
