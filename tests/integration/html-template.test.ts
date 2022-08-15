import {beforeAll, describe, it, jest} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

jest.setTimeout(60000)

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = new Project({
      label: '@examples/html-template',
      with: pacman,
    })

    await project.setup()
  })

  describe('package.json', () => {
    it('matches snapshot', () => {
      expect(project.packageJson).toMatchSnapshot()
    })
  })

  describe('index.html', () => {
    it('is the correct html', () => {
      expect(project.assets['index.html']).toMatchSnapshot()
    })
  })
}

describe('html-template', () => {
  describe('npm', run('npm'))
  describe('yarn', run('yarn'))
})
