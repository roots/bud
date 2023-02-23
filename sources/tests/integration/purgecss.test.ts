import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/purgecss`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/purgecss`,
      with: `npm`,
    }).setup()

    expect(project.assets[`app.css`].length).toBeGreaterThan(10)
    expect(project.assets[`app.css`].includes(`@import`)).toBeFalsy()
    expect(project.assets[`app.css`].includes(`h2`)).toBeTruthy()
    expect(project.assets[`app.css`]).not.toMatch(/\.*h3.*/)
  })
})
