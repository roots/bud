import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

const projectDir = globalThis.__INTEGRATION__
? `storage/fixtures/sass-module`
: `examples/sass-module`

describe(`examples/sass-module`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/sass-module`,
      projectDir,
    })

    if (globalThis.__INTEGRATION__)
      await test.install()

    await test.build()

    expect(test.assets[`main.css`].includes(`@import`)).toBeFalsy()
    expect(test.assets[`main.css`].includes(`@apply`)).toBe(false)
    expect(test.assets[`main.css`].match(/    /)).toBeFalsy()
    expect(test.assets[`main.css`].match(/\\n/)).toBeFalsy()

    expect(test.assets[`main.css`]).toMatch(/\.(.*){--tw-bg-opacity:1;background-color:#000;background-color:rgba\(0,0,0,var\(--tw-bg-opacity\)\);border:#fff}\.(.*){color:blue}$/)
    expect(test.manifest).toMatchSnapshot()
  })
})
