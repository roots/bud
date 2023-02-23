import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/markdown`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/markdown`,
      with: `npm`,
    }).setup()

    expect(project.assets[`main.js`].length).toBeGreaterThan(10)
    expect(project.assets[`main.js`].includes(`import `)).toBeFalsy()
  })
})
