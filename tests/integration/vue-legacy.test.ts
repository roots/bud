import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe(`examples/vue-legacy`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/vue-legacy`,
    })
    expect(await test.install()).not.toThrow()
    expect(await test.build()).not.toThrow()

    expect(test.assets[`main.js`].length).toBeGreaterThan(10)
    expect(test.assets[`main.js`].includes(`from '`)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
