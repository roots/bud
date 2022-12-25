import {Project} from '@repo/test-kit/project'
import {beforeAll, describe, expect, it} from 'vitest'

const run = (pacman: `npm` | `yarn`) => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/vue-3`,
      with: pacman,
    }).setup()
  })

  describe(`main.css`, () => {
    it(`has contents`, () => {
      expect(project.assets[`main.css`].length).toBeGreaterThan(10)
    })

    it(`is transpiled`, () => {
      expect(project.assets[`main.css`].includes(`from '`)).toBeFalsy()
    })
  })

  describe(`main.js`, () => {
    it(`has contents`, () => {
      expect(project.assets[`main.js`].length).toBeGreaterThan(10)
    })

    it(`is transpiled`, () => {
      expect(project.assets[`main.js`].includes(`from '`)).toBeFalsy()
    })
  })

  describe(`manifest.json`, () => {
    it(`matches snapshot`, () => {
      expect(project.manifest).toMatchSnapshot()
    })
  })
}

describe(`vue`, () => {
  describe(`npm`, run(`npm`))
  describe(`yarn`, run(`yarn`))
}, 240000)
