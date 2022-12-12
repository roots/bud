import {Project} from '@repo/test-kit/project'
import {paths} from '@repo/constants'
import fs from 'fs-extra'
import {beforeAll, describe, expect, it} from 'vitest'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/imagemin`,
      with: pacman,
    }).setup()
  })

  describe(`owl.jpeg`, () => {
    it(`is smaller than the original`, async () => {
      const original = await fs.readFile(
        `${paths.root}/examples/imagemin/src/images/owl.jpeg`,
        `utf8`,
      )

      expect(project.assets[`images/owl.jpeg`].length).toBeLessThan(
        original.length,
      )

      return Promise.resolve()
    })
  })
}

describe(`imagemin`, () => {
  describe(`npm`, run(`npm`))
  describe(`yarn`, run(`yarn`))
}, 240000)
