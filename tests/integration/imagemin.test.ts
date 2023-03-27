import {Project} from '@repo/test-kit/project'
import {paths} from '@repo/constants'
import fs from 'fs-extra'
import {describe, expect, it} from 'vitest'

describe(`examples/imagemin`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/imagemin`,
    }).setup()

    const original = await fs.readFile(
      `${paths.root}/examples/imagemin/src/images/owl.jpeg`,
      `utf8`,
    )

    expect(project.assets[`images/owl.jpeg`].length).toBeLessThan(
      original.length,
    )
  })
})
