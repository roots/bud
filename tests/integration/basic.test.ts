import {logger} from '@repo/logger'
import {Project} from '@repo/test-kit/project'
import {beforeAll, describe, it} from 'vitest'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/basic`,
      with: pacman,
    }).setup()
  })

  describe(`main.js`, () => {
    logger.info(project)

    it(`has contents`, () => {
      expect(project.assets[`main.js`].length).toBeGreaterThan(10)
    })

    it(`is transpiled`, () => {
      expect(project.assets[`main.js`].includes(`import`)).toBeFalsy()
    })
  })

  describe(`manifest.json`, () => {
    it(`matches snapshot`, () => {
      expect(project.manifest).toMatchSnapshot()
    })
  })
}

describe(`basic`, () => {
  describe(`npm`, run(`npm`))
  describe(`yarn`, run(`yarn`))
})
