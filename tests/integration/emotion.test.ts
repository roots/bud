import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/emotion`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/emotion`,
    })
    await test.install()
    await test.build()

    expect(test.manifest[`app.js`]).toBe(`js/app.js`)
    expect(test.manifest[`runtime.js`]).toBe(`js/runtime.js`)
    expect(test.manifest[`index.html`]).toBe(`index.html`)
    expect(test.manifest[`components/logo.svg`]).toBe(
      `components/logo.svg`,
    )
    expect(Object.keys(test.manifest).length).toBeGreaterThanOrEqual(5)

    expect(test.assets[`app.js`].length).toBeGreaterThan(10)
    expect(test.assets[`app.js`].includes(`import `)).toBeFalsy()
    expect(test.assets[`runtime.js`].length).toBeGreaterThan(10)
    expect(test.assets[`runtime.js`].includes(`import `)).toBeFalsy()
    expect(test.assets[`index.html`].length).toBeGreaterThan(10)
    expect(test.assets[`index.html`].includes(`<script`)).toBeTruthy()
    expect(test.assets[`components/logo.svg`].length).toBeGreaterThan(10)
    expect(
      test.assets[`components/logo.svg`].includes(`<svg`),
    ).toBeTruthy()
  })
})
