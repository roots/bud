import {beforeAll, describe, it, jest} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

jest.setTimeout(60000)

const test = (pacman: 'yarn' | 'npm') => () => {
  describe('examples/preset-recommend', () => {
    let project: Project

    beforeAll(async () => {
      project = new Project({
        name: 'preset-recommend',
        with: pacman,
        dist: 'dist',
      })

      await project.setup()
    })

    it('[app.js] has contents', () => {
      expect(project.assets['app.js'].length).toBeGreaterThan(10)
    })

    it('[app.js] is transpiled', () => {
      expect(project.assets['app.js'].includes('import')).toBeFalsy()
    })

    it('[app.css] is transpiled', () => {
      expect(project.assets['app.css']).toMatchSnapshot()
    })
  })
}

describe('preset-recommend', () => {
  describe('yarn', test('yarn'))

  describe('npm', test('npm'))
})
