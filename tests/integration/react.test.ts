import {beforeAll, describe, it} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: '@examples/react',
      with: pacman,
    }).setup()
  })

  describe('app.js', () => {
    it('should not be empty', () => {
      expect(project.assets['app.js'].length).toBeGreaterThan(10)
    })

    it('should not contain import statements', () => {
      expect(project.assets['app.js'].includes('import ')).toBeFalsy()
    })

    it('should be present in the manifest', () => {
      expect(project.manifest['app.js']).toMatchSnapshot()
    })
  })

  describe('runtime.js', () => {
    it('should not be empty', () => {
      expect(project.assets['runtime.js'].length).toBeGreaterThan(10)
    })

    it('should not contain import statements', () => {
      expect(project.assets['runtime.js'].includes('import ')).toBeFalsy()
    })

    it('should be present in the manifest', () => {
      expect(project.manifest['runtime.js']).toMatchSnapshot()
    })
  })

  describe('index.html', () => {
    it('should not be empty', () => {
      expect(project.assets['index.html'].length).toBeGreaterThan(10)
    })

    it('should have title: `Create Bud App`', () => {
      expect(
        project.assets['index.html'].includes(
          `<title>Create Bud App</title>`,
        ),
      ).toBeTruthy()
    })

    it('should contain a script tag', () => {
      expect(project.assets['index.html'].includes('<script')).toBeTruthy()
    })

    it('should be present in the manifest', () => {
      expect(project.manifest['index.html']).toMatchSnapshot()
    })
  })

  describe('svg/logo.svg', () => {
    it('should not be empty', () => {
      expect(project.assets['svg/logo.svg'].length).toBeGreaterThan(10)
    })

    it('should contain svg tag', () => {
      expect(project.assets['svg/logo.svg'].includes('<svg')).toBeTruthy()
    })

    it('should be present in the manifest', () => {
      expect(project.manifest['svg/logo.svg']).toMatchSnapshot()
    })
  })

  describe('manifest.json', () => {
    it('should have expected number of items', () => {
      expect(Object.keys(project.manifest)).toHaveLength(6)
    })
  })
}

describe('react', () => {
  describe('npm', run('npm'))
  describe('yarn', run('yarn'))
})
