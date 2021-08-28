import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/basic', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'basic',
      dir: 'examples/basic',
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

    it('matches snapshot', () => {
      expect(project.assets['main.js']).toMatchSnapshot()
    })
  })
})
