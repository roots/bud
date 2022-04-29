import {Project} from '@repo/test-kit/project'

jest.setTimeout(60000)

describe('examples/purgecss', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'purgecss',
      dir: 'examples/purgecss',
    })

    await project.setup()
  })

  describe('main.css', () => {
    it('has contents', () => {
      expect(project.assets['app.css'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['app.css'].includes('@import')).toBeFalsy()
    })

    it('successfully used @import', () => {
      expect(project.assets['app.css'].includes('h2')).toBeTruthy()
    })

    it('successfully purged unused css', () => {
      expect(!project.assets['app.css'].includes('h3')).toBeTruthy()
    })
  })
})
