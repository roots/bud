import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/emotion`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/emotion`,
    }).setup()

    expect(project.manifest[`app.js`]).toBe(`js/app.js`)
    expect(project.manifest[`runtime.js`]).toBe(`js/runtime.js`)
    expect(project.manifest[`index.html`]).toBe(`index.html`)
    expect(project.manifest[`components/logo.svg`]).toBe(
      `components/logo.svg`,
    )
    expect(Object.keys(project.manifest).length).toBe(6)

    expect(project.assets[`app.js`].length).toBeGreaterThan(10)
    expect(project.assets[`app.js`].includes(`import `)).toBeFalsy()
    expect(project.assets[`runtime.js`].length).toBeGreaterThan(10)
    expect(project.assets[`runtime.js`].includes(`import `)).toBeFalsy()
    expect(project.assets[`index.html`].length).toBeGreaterThan(10)
    expect(project.assets[`index.html`].includes(`<script`)).toBeTruthy()
    expect(project.assets[`components/logo.svg`].length).toBeGreaterThan(
      10,
    )
    expect(
      project.assets[`components/logo.svg`].includes(`<svg`),
    ).toBeTruthy()
  })
})
