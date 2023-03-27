import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/basic`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/basic`,
    }).setup()

    expect(project.assets[`main.js`].length).toBeGreaterThan(10)
    expect(project.assets[`main.js`].includes(`import`)).toBeFalsy()
    expect(project.manifest).toMatchSnapshot()
  })
})
