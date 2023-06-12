import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe(`examples/preset-recommend`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({label: `@examples/preset-recommend`})
    expect(await test.install()).not.toThrow()
    expect(await test.build()).not.toThrow()

    expect(test.assets[`app.js`].length).toBeGreaterThan(10)
    expect(test.assets[`app.js`].includes(`import`)).toBeFalsy()
    expect(test.assets[`app.css`]).toMatchSnapshot()
  })
})
