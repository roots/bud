import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/sass-tailwindcss`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/sass-tailwindcss`,
    }).setup()

    expect(project.assets[`app.css`].includes(`@import`)).toBeFalsy()
    expect(project.assets[`app.css`].includes(`@apply`)).toBe(false)
    expect(project.assets[`app.css`].match(/    /)).toBeFalsy()
    expect(project.assets[`app.css`].match(/\\n/)).toBeFalsy()
    expect(project.manifest).toMatchSnapshot()
  })
})
