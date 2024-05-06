import setup from '@repo/test-kit/setup'
import { testIsCompiledJs } from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/babel-advanced`, () => {
  it(`should compile js as expected`, async () => {
    const test = setup({label: `@examples/babel-advanced`})

    await test.install()
    await test.build()

    testIsCompiledJs(test.getAsset(`app.js`))
    expect(test.manifest).toMatchSnapshot()
  })
})
