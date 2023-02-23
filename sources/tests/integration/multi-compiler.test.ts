import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/multi-compiler`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/multi-compiler`,
      dist: `plugin/dist`,
      with: `npm`,
    }).setup()

    expect(project.assets[`plugin.js`].length).toBeGreaterThan(10)
    expect(project.assets[`plugin.js`].includes(`import `)).toBeFalsy()
    expect(project.manifest).toMatchSnapshot()
  })
})
