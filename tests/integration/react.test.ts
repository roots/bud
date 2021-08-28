import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/react', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'react',
      dir: 'examples/react',
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

  describe('app.css', () => {
    it('is transpiled', () => {
      expect(project.assets['app.css']).toMatchSnapshot()
    })
  })
})
