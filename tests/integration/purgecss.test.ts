import {beforeAll, describe, it} from '@jest/globals'
import {Project} from '@repo/test-kit/project'

const test = (pacman: 'yarn' | 'npm') => () => {
  describe(`examples/purgecss`, () => {
    let project: Project

    beforeAll(async () => {
      project = new Project({
        label: `@examples/purgecss`,
        with: pacman,
      })

      await project.setup()
    })

    describe(`main.css`, () => {
      it(`has contents`, () => {
        expect(project.assets[`app.css`].length).toBeGreaterThan(10)
      })

      it(`is transpiled`, () => {
        expect(project.assets[`app.css`].includes(`@import`)).toBeFalsy()
      })

      it(`successfully used @import`, () => {
        expect(project.assets[`app.css`].includes(`h2`)).toBeTruthy()
      })

      it(`successfully purged unused css`, () => {
        expect(!project.assets[`app.css`].includes(`h3`)).toBeTruthy()
      })
    })
  })
}

describe(`purgecss`, () => {
  describe(`npm`, test(`npm`))
  describe(`yarn`, test(`yarn`))
})
