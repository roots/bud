import setup from '@repo/test-kit/setup'
import { testIsCompiledJs } from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/typescript`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/typescript`,
    })
    await test.install()
    await test.build()

    testIsCompiledJs(test.getAsset(`app.js`))
  })
})
