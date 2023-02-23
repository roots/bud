import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/preset-recommend`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/preset-recommend`,
      with: `npm`,
    }).setup()

    expect(project.assets[`app.js`].length).toBeGreaterThan(10)
    expect(project.assets[`app.js`].includes(`import`)).toBeFalsy()
    expect(project.assets[`app.css`]).toMatchSnapshot()
  })
})
