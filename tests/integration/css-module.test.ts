import setup from '@repo/test-kit/setup'
import { testIsCompiledCss } from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/css-module`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/css-module`,
    })

    await test.install()
    await test.build()

    testIsCompiledCss(test.getAsset(`main.css`))
    expect(test.assetString(`main.css`)).toMatch(
      /\.(.*){--tw-bg-opacity:1;background-color:#000;background-color:rgba\(0,0,0,var\(--tw-bg-opacity\)\);border:#fff}\.(.*){color:blue}$/,
    )

    expect(test.manifest).toMatchSnapshot()
  })
})
