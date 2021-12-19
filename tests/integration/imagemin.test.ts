import {readFile} from 'fs-extra'

import Project from '../../dev/jest/project'

jest.setTimeout(60000)

describe('examples/imagemin', () => {
  let project

  beforeAll(async () => {
    project = new Project({
      name: 'imagemin',
      dir: 'examples/imagemin',
    })

    await project.setup()
  })

  describe('package.json', () => {
    it('matches snapshot', () => {
      expect(project.packageJson).toMatchSnapshot({
        name: 'example-imagemin',
        private: true,
        browserslist: {
          production: ['>0.5%', 'not dead', 'not op_mini all'],
          development: [
            'last 1 chrome version',
            'last 1 firefox version',
            'last 1 safari version',
          ],
        },
        devDependencies: {
          '@roots/bud': 'workspace:*',
          '@roots/bud-imagemin': 'workspace:*',
        },
      })
    })
  })

  describe('app.js', () => {
    it('has contents', () => {
      expect(project.assets['app.js'].length).toBeGreaterThan(10)
    })

    it('matches snapshot', () => {
      expect(project.assets['app.js'].length).toMatchSnapshot()
    })
  })

  describe('owl.jpeg', () => {
    it('is smaller than the original', async () => {
      const original = await readFile(
        `${process.cwd()}/examples/imagemin/src/owl.jpeg`,
        'utf8',
      )

      expect(
        project.assets['assets/owl.jpeg'].length,
      ).toBeLessThan(original.length)

      expect(project.assets['assets/owl.jpeg']).toMatchSnapshot()

      return Promise.resolve()
    })
  })
})
