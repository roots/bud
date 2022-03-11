import {Project} from '@repo/test-kit/project'

jest.setTimeout(60000)

describe('examples/basic', () => {
  let project

  beforeAll(async () => {
    project = new Project({
      name: 'basic',
      dir: 'examples/basic',
    })

    await project.setup()
  })

  describe('package.json', () => {
    it('matches snapshot', () => {
      expect(project.packageJson).toMatchSnapshot()
    })
  })

  describe('main.js', () => {
    it('has contents', () => {
      expect(project.assets['main.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(project.assets['main.js'].includes('import')).toBeFalsy()
    })

    it('matches snapshot', () => {
      expect(project.assets['main.js']).toMatchSnapshot()
    })
  })
})
