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
        project.assets['app.js'].includes(
          `@keyframes App-logo-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}height:30vmin;pointer-events:none;margin-bottom:2rem;animation:App-logo-spin infinite 20s linear`,
        ),
      ).toBe(true)
    })
  })
})
