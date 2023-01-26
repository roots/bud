import {Project} from '@repo/test-kit/project'
import {beforeAll, describe, expect, it} from 'vitest'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/remote-sources`,
      with: pacman,
    }).setup()
  })

  describe(`app.js`, () => {
    it(`should not be empty`, () => {
      expect(project.assets[`app.js`].length).toBeGreaterThan(10)
    })

    it(`should not contain import statements`, () => {
      expect(project.assets[`app.js`].includes(`import `)).toBeFalsy()
    })

    it(`should be present in the manifest`, () => {
      expect(project.manifest[`app.js`]).toMatchSnapshot()
    })
  })

  describe(`manifest.json`, () => {
    it(`should have expected number of items`, () => {
      expect(Object.keys(project.manifest)).toHaveLength(3)
    })
  })
}

describe(`remote-sources`, () => {
  describe(`npm`, run(`npm`))
  describe(`yarn`, run(`yarn`))
}, 240000)
