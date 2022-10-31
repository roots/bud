import {Project} from '@repo/test-kit/project'
import {beforeAll, describe, it} from 'vitest'

const run = pacman => () => {
  let project: Project

  beforeAll(async () => {
    project = await new Project({
      label: `@examples/preset-recommend`,
      with: pacman,
    }).setup()
  })

  it(`[app.js] has contents`, () => {
    expect(project.assets[`app.js`].length).toBeGreaterThan(10)
  })

  it(`[app.js] is transpiled`, () => {
    expect(project.assets[`app.js`].includes(`import`)).toBeFalsy()
  })

  it(`[app.css] is transpiled`, () => {
    expect(project.assets[`app.css`]).toMatchSnapshot()
  })
}

describe(`preset-recommend`, () => {
  describe(`yarn`, run(`yarn`))
  describe(`npm`, run(`npm`))
})
