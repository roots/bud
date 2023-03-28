import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/sass`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/sass`,
    }).setup()

    expect(project.assets[`main.css`].length).toBeGreaterThan(10)
    expect(project.assets[`main.css`].includes(`import`)).toBeFalsy()
    expect(project.assets[`main.css`]).toMatchSnapshot()
    expect(project.manifest).toMatchSnapshot()
  })
}, 100000)
