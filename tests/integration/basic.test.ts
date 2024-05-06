import setup from '@repo/test-kit/setup'
import { testIsCompiledJs } from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/basic`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/basic`,
    })
    await test.install()
    await test.build()

    testIsCompiledJs(test.getAsset(`main.js`))
    expect(test.manifest).toMatchSnapshot()
  })
})
