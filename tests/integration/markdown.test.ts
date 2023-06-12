import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe(`examples/markdown`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/markdown`,
    })
    await test.install()
    await test.build()

    expect(test.assets[`main.js`].length).toBeGreaterThan(10)
    expect(test.assets[`main.js`].includes(`import `)).toBeFalsy()
  })
})
