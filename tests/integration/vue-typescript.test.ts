import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`vue (typescript)`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/vue-typescript`,
      with: `npm`,
    }).setup()

    expect(project.manifest).toMatchSnapshot()
    expect(project.assets[`main.js`].length).toBeGreaterThan(10)
    expect(project.assets[`main.js`].includes(`from '`)).toBeFalsy()
    expect(project.assets[`main.css`].length).toBeGreaterThan(10)
    expect(project.assets[`main.css`].includes(`$vue-green`)).toBeFalsy()
  })
})
