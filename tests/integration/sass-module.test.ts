import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/sass-module`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({label: `@examples/sass-module`})

    await test.install()
    await test.build()

    expect(test.manifest).toMatchSnapshot()
    expect(test.assetString(`main.css`)).toMatch(
      /\.(.*){--tw-bg-opacity:1;background-color:#000;background-color:rgba\(0,0,0,var\(--tw-bg-opacity\)\);border:#fff}\.(.*){color:blue}$/,
    )
  })
})
