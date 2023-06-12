import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe(`examples/multi-compiler`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/multi-compiler`,
      dist: `plugin/dist`,
    })
    expect(await test.install()).not.toThrow()
    expect(await test.build()).not.toThrow()

    expect(test.assets[`plugin.js`].length).toBeGreaterThan(10)
    expect(test.assets[`plugin.js`].includes(`import `)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
