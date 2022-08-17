import {Project} from '@repo/test-kit/project'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/typescript`,
      with: pacman,
      buildCommand: [`./node_modules/.bin/ts-bud`, [`build`, `--ci`]],
    }).setup()
  })

  describe(`app.js`, () => {
    it(`has contents`, () => {
      expect(project.assets[`app.js`].length).toBeGreaterThan(10)
    })

    it(`is transpiled`, () => {
      expect(project.assets[`app.js`].includes(`from '`)).toBeFalsy()
    })
  })

  describe(`manifest.json`, () => {
    it(`matches snapshot`, () => {
      expect(project.manifest).toMatchSnapshot()
    })
  })
}

describe(`typescript`, () => {
  describe(`npm`, run(`npm`))
  describe(`yarn`, run(`yarn`))
})
