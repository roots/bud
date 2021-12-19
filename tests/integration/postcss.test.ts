import Project from '../../dev/jest/project'

jest.setTimeout(60000)

describe('examples/postcss', () => {
  let project

  beforeAll(async () => {
    project = new Project({
      name: 'postcss',
      dir: 'examples/postcss',
    })

    await project.setup()
  })

  describe('main.css', () => {
    it('has contents', () => {
      expect(project.assets['app.css'].length).toBeGreaterThan(
        10,
      )
    })

    it('is transpiled', () => {
      expect(
        project.assets['app.css'].includes('@import'),
      ).toBeFalsy()
    })

    it('successfully used @import', () => {
      expect(
        project.assets['app.css'].includes('h2'),
      ).toBeTruthy()
    })
  })
})
