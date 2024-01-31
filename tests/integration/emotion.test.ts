import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/emotion`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/emotion`,
    })
    await test.install()
    await test.build()

    expect(test.manifest[`main.js`]).toBe(`js/main.js`)
    expect(test.manifest[`runtime.js`]).toBe(`js/runtime.js`)
    expect(test.manifest[`components/logo.svg`]).toBe(
      `components/logo.svg`,
    )
    expect(Object.keys(test.manifest).length).toBeGreaterThanOrEqual(4)

    expect(test.getAsset(`main.js`).length).toBeGreaterThan(10)
    expect(test.getAsset(`main.js`)).not.toMatch(/import /)
    expect(test.getAsset(`runtime.js`).length).toBeGreaterThan(10)
    expect(test.getAsset(`runtime.js`)).not.toMatch(/import /)
    expect(test.getAsset(`components/logo.svg`).length).toBeGreaterThan(10)
    expect(test.getAsset(`components/logo.svg`)).toMatch(/\<svg/)
  })
})
