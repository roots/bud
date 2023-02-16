import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/typescript`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/typescript`,
      with: `npm`,
      buildCommand: [`./node_modules/.bin/ts-bud`, [`build`, `--ci`]],
    }).setup()

    expect(project.assets[`app.js`].length).toBeGreaterThan(10)
    expect(project.assets[`app.js`].includes(`from '`)).toBeFalsy()
    expect(project.manifest).toMatchSnapshot()
  })
})
