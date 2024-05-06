import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/vue-3`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/vue-3`,
    })
    await test.install()
    await test.build()

    expect(test.assets[`main.css`].length).toBeGreaterThan(10)
    expect(test.assets[`main.css`].includes(`from '`)).toBeFalsy()
    expect(test.assets[`main.js`].length).toBeGreaterThan(10)
    expect(test.assets[`main.js`].includes(`from '`)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
