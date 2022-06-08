import {beforeAll, describe, it} from '@jest/globals'
import {Project} from '@repo/test-kit/project'
import fs from 'fs-extra'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      name: 'imagemin',
      dist: 'dist',
      with: pacman,
    }).setup()
  })

  describe('owl.jpeg', () => {
    it('is smaller than the original', async () => {
      const original = await fs.readFile(
        `${process.cwd()}/examples/imagemin/src/owl.jpeg`,
        'utf8',
      )

      expect(project.assets['images/owl.jpeg'].length).toBeLessThan(
        original.length,
      )

      return Promise.resolve()
    })
  })
}

describe('imagemin', () => {
  describe('npm', run('npm'))
  describe('yarn', run('yarn'))
})
