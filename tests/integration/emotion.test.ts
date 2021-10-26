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
      expect(project.packageJson).toMatchSnapshot({
        browserslist: {
          development: [
            'last 1 chrome version',
            'last 1 firefox version',
            'last 1 safari version',
          ],
          production: ['>0.5%', 'not dead', 'not op_mini all'],
        },
        devDependencies: {
          '@roots/bud': 'workspace:packages/@roots/bud',
          '@roots/bud-babel':
            'workspace:packages/@roots/bud-babel',
          '@roots/bud-emotion':
            'workspace:packages/@roots/bud-emotion',
          '@roots/bud-react':
            'workspace:packages/@roots/bud-react',
        },
        name: 'example-emotion',
        private: true,
      })
    })
  })

  describe('app.js', () => {
    it('is transpiled', () => {
      expect(project.assets['app.js']).toMatchSnapshot()
    })
  })
})
