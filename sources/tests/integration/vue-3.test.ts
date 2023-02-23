import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/vue-3`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/vue-3`,
      with: `npm`,
    }).setup()

    expect(project.assets[`main.css`].length).toBeGreaterThan(10)
    expect(project.assets[`main.css`].includes(`from '`)).toBeFalsy()
    expect(project.assets[`main.js`].length).toBeGreaterThan(10)
    expect(project.assets[`main.js`].includes(`from '`)).toBeFalsy()
    expect(project.manifest).toMatchSnapshot()
  })
})
