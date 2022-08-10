import {beforeAll, describe, it} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

const run = pacman => () => {
  describe('examples/preset-recommend', () => {
    let project: Project

    beforeAll(async () => {
      project = await new Project({
        name: 'preset-recommend',
        with: pacman,
        dist: 'dist',
      }).setup()
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
  describe('yarn', run('yarn'))

  describe('npm', run('npm'))
})
