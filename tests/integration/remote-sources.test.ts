import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/remote-sources`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({label: `@examples/remote-sources`})
    await test.install()
    await test.build()

    expect(test.assets[`app.js`].length).toBeGreaterThan(10)
    expect(test.assets[`app.js`].includes(`import `)).toBe(false)
    expect(test.manifest[`app.js`]).toMatchSnapshot()
    expect(Object.keys(test.manifest)).toHaveLength(6)
  })
})
