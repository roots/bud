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
    it('has contents', () => {
      expect(project.assets['app.css'].length).toBeGreaterThan(
        10,
      )
    })

    it('is transpiled', () => {
      expect(project.assets['app.css'].includes('@import')).toBe(
        false,
      )
    })

    it('@tailwind directive is transpiled', () => {
      expect(project.assets['app.css'].includes('@apply')).toBe(
        false,
      )
    })

    it('has whitespace removed', () => {
      expect(project.assets['app.css'].match(/    /)).toBeFalsy()
    })

    it('has breaks removed', () => {
      expect(project.assets['app.css'].match(/\\n/)).toBeFalsy()
    })
  })

  describe('jit', () => {
    it('is used to build css', () => {
      expect(
        project.assets['app.css'].match(/w-\\\[800px\\\]/),
      ).toBeTruthy()
    })
  })
})
