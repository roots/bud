import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/basic`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/basic`,
    })
    await test.install()
    await test.build()

    expect(test.assets[`main.js`].length).toBeGreaterThan(10)
    expect(test.assets[`main.js`].includes(`import`)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
