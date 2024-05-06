import setup from '@repo/test-kit/setup'
import { testIsCompiledCss } from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/tailwindcss`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/tailwindcss`,
    })

    await test.install()
    await test.build()

    testIsCompiledCss(test.getAsset(`main.css`))
  })
})
