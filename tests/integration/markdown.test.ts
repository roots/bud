import {beforeAll, describe, it} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

const run = pacman => () => {
  let project

  beforeAll(async () => {
    project = new Project({
      label: `@examples/markdown`,
      with: pacman,
    })

    await project.setup()
  })

  describe(`app.js`, () => {
    it(`has contents`, () => {
      expect(project.assets[`app.js`].length).toBeGreaterThan(10)
    })

    it(`is transpiled`, () => {
      expect(project.assets[`app.js`].includes(`import`)).toBeFalsy()
    })
  })
}

describe(`markdown`, () => {
  describe(`npm`, run(`npm`))
  describe(`yarn`, run(`yarn`))
})
