import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe(`examples/react`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/react`,
    })
    expect(await test.install()).not.toThrow()
    expect(await test.build()).not.toThrow()

    expect(test.assets[`app.js`].length).toBeGreaterThan(10)
    expect(test.assets[`app.js`].includes(`import `)).toBeFalsy()
    expect(test.manifest[`app.js`]).toMatchSnapshot()
    expect(test.assets[`runtime.js`].length).toBeGreaterThan(10)
    expect(test.assets[`runtime.js`].includes(`import `)).toBeFalsy()
    expect(test.manifest[`runtime.js`]).toMatchSnapshot()
    expect(test.assets[`components/logo.svg`].length).toBeGreaterThan(10)
    expect(
      test.assets[`components/logo.svg`].includes(`<svg`),
    ).toBeTruthy()
    expect(test.manifest[`components/logo.svg`]).toMatchSnapshot()
    expect(Object.keys(test.manifest)).toHaveLength(5)
  })
})
