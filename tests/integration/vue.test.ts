import Project from '../../dev/jest/project'

jest.setTimeout(60000)

describe('examples/vue', () => {
  let project

  beforeAll(async () => {
    project = new Project({
      name: 'vue',
      dir: 'examples/vue',
    })

    await project.setup()
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(project.assets['app.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(
        project.assets['app.js'].includes('import'),
      ).toBeFalsy()
    })
  })
})
