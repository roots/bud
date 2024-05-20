import {readFile} from 'node:fs/promises'

import {path} from '@repo/constants'
import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/imagemin`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/imagemin`,
    })
    await test.install()
    await test.build()

    const original = await readFile(
      path(`examples/imagemin/src/images/owl.jpeg`),
      `utf8`,
    )

    if (typeof original?.length !== `number`) {
      throw new Error(`examples/imagemin: original.length is not a number`)
    }

    expect(test.getAsset(`images/owl.jpeg`).length).toBeLessThan(
      original.length,
    )
  })
})
