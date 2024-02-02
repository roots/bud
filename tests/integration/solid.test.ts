import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/solid`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/solid`,
    })
    await test.install()
    await test.build()

    expect(test.assets[`app.js`].length).toBeGreaterThan(10)
    expect(test.assets[`app.js`]).not.toContain(`@import`)

    expect(test.assets[`runtime.js`].length).toBeGreaterThan(10)
    expect(test.assets[`runtime.js`]).not.toContain(`@import`)
  })
})
