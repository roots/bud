import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe(`examples/purgecss`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({label: `@examples/purgecss`})
    await test.install()
    await test.build()

    expect(test.assets[`app.css`].length).toBeGreaterThan(10)
    expect(test.assets[`app.css`].includes(`@import`)).toBeFalsy()
    expect(test.assets[`app.css`].includes(`h2`)).toBeTruthy()
    expect(test.assets[`app.css`]).not.toMatch(/\.*h3.*/)
  })
})
