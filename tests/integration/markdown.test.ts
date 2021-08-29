import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/markdown', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'markdown',
      dir: 'examples/markdown',
    })

    await project.setup()
  })

  describe('package.json', () => {
    it('matches snapshot', () => {
      expect(project.packageJson).toMatchSnapshot()
    })
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
