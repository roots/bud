import setup from '@repo/test-kit/setup'
import { testIsCompiledJs } from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/solid`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({label: `@examples/solid`})
    await test.install()
    await test.build()

    testIsCompiledJs(test.getAsset(`app.js`))
    testIsCompiledJs(test.getAsset(`runtime.js`))
    expect(test.manifest).toMatchSnapshot()
  })
})
