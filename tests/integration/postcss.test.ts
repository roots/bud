import {Project} from '../util/integration'

jest.setTimeout(60000)

describe('examples/postcss', () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      name: 'postcss',
      dir: 'examples/postcss',
    })

    await project.setup()
  })

  describe('package.json', () => {
    it('matches snapshot', () => {
      expect(project.packageJson).toMatchSnapshot({
        "browserslist": {
          "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version",
          ],
          "production": [
            ">0.5%",
            "not dead",
            "not op_mini all",
          ],
        },
        "devDependencies": {
          "@roots/bud": "workspace:*",
          "@roots/bud-babel": "workspace:*",
          "@roots/bud-postcss": "workspace:*",
          "postcss": expect.any(String),
          "postcss-import": expect.any(String),
          "postcss-preset-env": expect.any(String),
        },
        "name": "example-postcss",
        "private": true,
      })
    })
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
