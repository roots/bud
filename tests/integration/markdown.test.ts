import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/markdown', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'markdown',
      dir: 'examples/markdown',
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
          '@roots/bud': 'workspace:*',
          '@roots/bud-mdx': 'workspace:*',
          '@roots/bud-preset-recommend': 'workspace:*',
          '@roots/bud-react': 'workspace:*',
          '@types/react': expect.any(String),
          '@types/react-dom': expect.any(String),
          postcss: expect.any(String),
          'postcss-import': expect.any(String),
          'postcss-preset-env': expect.any(String),
          react: expect.any(String),
          'react-dom': expect.any(String),
        },
        name: 'example-markdown',
        private: true,
      })
    })
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
})
