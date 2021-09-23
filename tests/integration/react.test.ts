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
          '@roots/bud-postcss':
            'workspace:packages/@roots/bud-postcss',
          '@roots/bud-react':
            'workspace:packages/@roots/bud-react',
          '@types/react': expect.any(String),
          '@types/react-dom': expect.any(String),
          postcss: expect.any(String),
          'postcss-import': expect.any(String),
          'postcss-preset-env': expect.any(String),
          react: expect.any(String),
          'react-dom': expect.any(String),
        },
        name: 'example-react',
        private: true,
      })
    })
  })

  it('[app.js] has contents', () => {
    expect(project.assets['app.js'].length).toBeGreaterThan(10)
  })

  it('[app.js] is transpiled', () => {
    expect(
      project.assets['app.js'].includes('import'),
    ).toBeFalsy()
  })

  it('[app.css] is transpiled', () => {
    expect(project.assets['app.css']).toMatchSnapshot()
  })
})
