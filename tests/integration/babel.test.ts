import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/babel`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/babel`,
    }).setup()

    expect(project.assets[`app.js`].length).toBeGreaterThan(10)
    expect(project.assets[`app.js`].includes(`import `)).toBeFalsy()
    expect(project.manifest).toMatchSnapshot()
  })
})
