import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/vue-typescript`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/vue-typescript`,
    })
    await test.install()
    await test.build()

    expect(test.manifest).toMatchSnapshot()
    expect(test.assets[`main.js`].length).toBeGreaterThan(10)
    expect(test.assets[`main.js`].includes(`from '`)).toBeFalsy()
    expect(test.assets[`main.css`].length).toBeGreaterThan(10)
    expect(test.assets[`main.css`].includes(`$vue-green`)).toBeFalsy()
  })
})
