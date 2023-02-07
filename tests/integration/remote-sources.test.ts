import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

let project: Project

describe(`app.js`, async () => {
  project = await new Project({
    label: `@examples/remote-sources`,
    with: `npm`,
  }).setup()

  it(`app.js should not be empty`, () => {
    expect(project.assets[`app.js`].length).toBeGreaterThan(10)
  })

  it(`app.js should not contain import statements`, () => {
    expect(project.assets[`app.js`].includes(`import `)).toBeFalsy()
  })

  it(`app.js should be present in the manifest`, () => {
    expect(project.manifest[`app.js`]).toMatchSnapshot()
  })

  it(`manifest.json should have expected number of items`, () => {
    expect(Object.keys(project.manifest)).toHaveLength(4)
  })
}, 240000)
