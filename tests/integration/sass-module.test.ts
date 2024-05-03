import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/sass-module`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/sass-module`,
    })

    await test.install()
    await test.build()


    expect(test.assetString(`main.css`).includes(`@import`)).toBeFalsy()
    expect(test.assetString(`main.css`).includes(`@apply`)).toBe(false)
    expect(test.assetString(`main.css`).match(/    /)).toBeFalsy()
    expect(test.assetString(`main.css`).match(/\\n/)).toBeFalsy()

    expect(test.assetString(`main.css`)).toMatch(/\.(.*){--tw-bg-opacity:1;background-color:#000;background-color:rgba\(0,0,0,var\(--tw-bg-opacity\)\);border:#fff}\.(.*){color:blue}$/)

    expect(test.manifest).toMatchSnapshot()
  })
})
