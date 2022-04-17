import {Project} from '@repo/test-kit/project'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      name: 'basic',
      dist: 'dist',
      with: pacman,
    }).setup()
  })

  describe('main.js', () => {
    it('has contents', () =>
      expect(project.assets['main.js']).toMatchSnapshot())

    it('is transpiled', () => {
      expect(project.assets['main.js'].includes('import')).toBeFalsy()
    })

    it('matches snapshot', () => {
      expect(project.assets['main.js']).toMatchSnapshot()
    })
  })

  describe('manifest.json', () => {
    it('matches snapshot', () => {
      expect(project.manifest).toMatchSnapshot()
    })
  })
}

describe('basic', () => {
  describe('npm', run('npm'))
  describe('yarn', run('yarn'))
})
