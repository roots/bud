import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/emotion', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'emotion',
      dir: 'examples/emotion',
    })

    await project.setup()
  })

  describe('app.js', () => {
    it('is transpiled', () => {
      expect(project.assets['app.js']).toMatchSnapshot()
    })
  })
})
