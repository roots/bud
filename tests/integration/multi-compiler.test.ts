import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe.skip(`examples/multi-compiler`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/multi-compiler`,
      dist: `plugin/dist`,
    })
    await test.install()
    await test.build()

    expect(test.assets[`plugin.js`].length).toBeGreaterThan(10)
    expect(test.assets[`plugin.js`].includes(`import `)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
