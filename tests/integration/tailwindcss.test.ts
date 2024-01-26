import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/tailwindcss`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/tailwindcss`,
    })

    await test.install()
    await test.build()

    expect(test.getAsset(`main.css`)).not.toContain(`@import`)
    expect(test.getAsset(`main.css`)).not.toContain(`@apply`)
    expect(test.getAsset(`main.css`)).not.toMatch(/    /)
    expect(test.getAsset(`main.css`)).not.toMatch(/\\n/)
    expect(test.getAsset(`main.css`)).toMatch(/^\*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}/)

    expect(test.getAsset(`main.js`)).toContain(`#4f46e5`)
  })
})
