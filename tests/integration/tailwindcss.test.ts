import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/tailwindcss`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/tailwindcss`,
    })
    await test.install()
    await test.build()

    expect(test.getAsset(`main.css`).includes(`@import`)).toBe(false)
    expect(test.getAsset(`main.css`).includes(`@apply`)).toBe(false)
    expect(test.getAsset(`main.css`).match(/    /)).toBe(null)
    expect(test.getAsset(`main.css`).match(/\\n/)).toBe(null)
  })
})
