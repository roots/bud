import {Project} from '@repo/test-kit/project'
import {paths} from '@repo/constants'
import fs from 'fs-jetpack'
import {describe, expect, it} from 'vitest'

describe(`examples/imagemin`, () => {
  it(`should compile js and css as expected`, async () => {
    const project = await new Project({
      label: `@examples/imagemin`,
    }).setup()

    const original = await fs.readAsync(
      `${paths.root}/examples/imagemin/src/images/owl.jpeg`,
      `utf8`,
    )

    if (typeof original?.length !== `number`) {
      throw new Error(
        `examples/imagemin: original?.length is not a number`,
      )
    }

    expect(project.assets[`images/owl.jpeg`].length).toBeLessThan(
      original.length,
    )
  })
})
