import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/preset-recommend', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'preset-recommend',
      dir: 'examples/preset-recommend',
    })

    await project.setup()
  })

  describe('main.js', () => {
    it('has contents', () => {
      expect(project.assets['main.js'].length).toBeGreaterThan(
        10,
      )
    })

    it('is transpiled', () => {
      expect(
        project.assets['main.js'].includes('import'),
      ).toBeFalsy()
    })
  })

  describe('main.css', () => {
    it('is transpiled', () => {
      expect(project.assets['main.css']).toMatchSnapshot()
    })
  })
})
