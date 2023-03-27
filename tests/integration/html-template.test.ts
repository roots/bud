import {Project} from '@repo/test-kit/project'
import {describe, expect, it} from 'vitest'

describe(`examples/html-template`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/html-template`,
    }).setup()
    expect(project.assets[`index.html`]).toMatchSnapshot()
  })
})
