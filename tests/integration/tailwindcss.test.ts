import {beforeAll, describe, it} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      name: 'tailwindcss',
      dist: 'dist',
      with: pacman,
    }).setup()
  })

  describe('app.css', () => {
    it('is transpiled', () => {
      expect(project.assets['app.css'].includes('@import')).toBeFalsy()
    })

    it('has transpiled @tailwind directives', () => {
      expect(project.assets['app.css'].includes('@apply')).toBe(false)
    })

    it('has whitespace removed', () => {
      expect(project.assets['app.css'].match(/    /)).toBeFalsy()
    })

    it('has breaks removed', () => {
      expect(project.assets['app.css'].match(/\\n/)).toBeFalsy()
    })
  })

  describe('manifest.json', () => {
    it('matches snapshot', () => {
      expect(project.manifest).toMatchSnapshot()
    })
  })
}

describe('tailwindcss', () => {
  describe('npm', run('npm'))
  describe('yarn', run('yarn'))
})
