import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/html-template', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'html-template',
      dir: 'examples/html-template',
    })

    await project.setup()
  })

  describe('index.html', () => {
    it('is the correct html', () => {
      expect(project.assets['index.html']).toMatchSnapshot()
    })
  })
})
