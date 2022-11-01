import {Project} from '@repo/test-kit/project'
import {beforeAll, describe, expect, it} from 'vitest'

const test = (pacman: 'yarn' | 'npm') => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/postcss`,
      with: pacman,
    }).setup()
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
  })
}

describe(`postcss`, () => {
  describe(`yarn`, test(`yarn`))
  describe(`npm`, test(`npm`))
}, 240000)
