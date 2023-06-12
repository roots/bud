import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe(`examples/vue-typescript`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/vue-typescript`,
    })
    expect(await test.install()).not.toThrow()
    expect(await test.build()).not.toThrow()

    expect(test.manifest).toMatchSnapshot()
    expect(test.assets[`main.js`].length).toBeGreaterThan(10)
    expect(test.assets[`main.js`].includes(`from '`)).toBeFalsy()
    expect(test.assets[`main.css`].length).toBeGreaterThan(10)
    expect(test.assets[`main.css`].includes(`$vue-green`)).toBeFalsy()
  })
})
