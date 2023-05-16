import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/react`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/react`,
    }).setup()

    expect(project.assets[`app.js`].length).toBeGreaterThan(10)
    expect(project.assets[`app.js`].includes(`import `)).toBeFalsy()
    expect(project.manifest[`app.js`]).toMatchSnapshot()
    expect(project.assets[`runtime.js`].length).toBeGreaterThan(10)
    expect(project.assets[`runtime.js`].includes(`import `)).toBeFalsy()
    expect(project.manifest[`runtime.js`]).toMatchSnapshot()
    expect(project.assets[`components/logo.svg`].length).toBeGreaterThan(
      10,
    )
    expect(
      project.assets[`components/logo.svg`].includes(`<svg`),
    ).toBeTruthy()
    expect(project.manifest[`components/logo.svg`]).toMatchSnapshot()
    expect(Object.keys(project.manifest)).toHaveLength(6)
  })
})
