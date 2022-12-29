import {Project} from '@repo/test-kit/project'
import {beforeAll, describe, expect, it} from 'vitest'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/react`,
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

  describe(`runtime.js`, () => {
    it(`should not be empty`, () => {
      expect(project.assets[`runtime.js`].length).toBeGreaterThan(10)
    })

    it(`should not contain import statements`, () => {
      expect(project.assets[`runtime.js`].includes(`import `)).toBeFalsy()
    })

    it(`should be present in the manifest`, () => {
      expect(project.manifest[`runtime.js`]).toMatchSnapshot()
    })
  })

  describe(`commponents/logo.svg`, () => {
    it(`should not be empty`, () => {
      expect(project.assets[`components/logo.svg`].length).toBeGreaterThan(
        10,
      )
    })

    it(`should contain svg tag`, () => {
      expect(
        project.assets[`components/logo.svg`].includes(`<svg`),
      ).toBeTruthy()
    })

    it(`should be present in the manifest`, () => {
      expect(project.manifest[`components/logo.svg`]).toMatchSnapshot()
    })
  })

  describe(`manifest.json`, () => {
    it(`should have expected number of items`, () => {
      expect(Object.keys(project.manifest)).toHaveLength(5)
    })
  })
}

describe(`react`, () => {
  describe(`npm`, run(`npm`))
  describe(`yarn`, run(`yarn`))
}, 240000)
