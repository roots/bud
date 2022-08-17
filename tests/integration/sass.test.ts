import {Project} from '@repo/test-kit/project'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/sass`,
      with: pacman,
    }).setup()
  })

  describe(`app.css`, () => {
    it(`has contents`, () => {
      expect(project.assets[`app.css`].length).toBeGreaterThan(10)
    })

    it(`is transpiled`, () => {
      expect(project.assets[`app.css`].includes(`import`)).toBeFalsy()
    })

    it(`matches snapshot`, () => {
      expect(project.assets[`app.css`]).toMatchSnapshot()
    })
  })

  describe(`manifest.json`, () => {
    it(`matches snapshot`, () => {
      expect(project.manifest).toMatchSnapshot()
    })
  })
}

describe(`sass`, () => {
  describe(`npm`, run(`npm`))
  describe(`yarn`, run(`yarn`))
})
