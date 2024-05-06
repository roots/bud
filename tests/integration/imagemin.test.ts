import {path} from '@repo/constants'
import setup from '@repo/test-kit/setup'
import fs from 'fs-jetpack'
import {describe, expect, it} from 'vitest'

describe(`examples/imagemin`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/imagemin`,
    })
    await test.install()
    await test.build()

    const original = await fs.readAsync(
      path(`examples/imagemin/src/images/owl.jpeg`),
      `utf8`,
    )

    if (typeof original?.length !== `number`) {
      throw new Error(
        `examples/imagemin: original?.length is not a number`,
      )
    }

    expect(test.assets[`images/owl.jpeg`].length).toBeLessThan(
      original.length,
    )
  })
})
