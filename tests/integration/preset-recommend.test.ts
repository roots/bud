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
          '@roots/bud-preset-recommend':
            'workspace:packages/@roots/bud-preset-recommend',
          postcss: expect.any(String),
          'postcss-import': expect.any(String),
          'postcss-preset-env': expect.any(String),
        },
        name: 'example-preset-recommend',
        private: true,
      })
    })
  })

  it('[main.js] has contents', () => {
    expect(project.assets['main.js'].length).toBeGreaterThan(10)
  })

  it('[main.js] is transpiled', () => {
    expect(
      project.assets['main.js'].includes('import'),
    ).toBeFalsy()
  })

  it('[main.css] is transpiled', () => {
    expect(project.assets['main.css']).toMatchSnapshot()
  })
})
