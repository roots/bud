import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/babel`, () => {
  it(`should compile js as expected`, async () => {
    const test = setup({
      label: `@examples/babel`,
    })
    await test.install()
    await test.build()

    const js = test.getAsset(`app.js`)
    expect(js.length).toBeGreaterThan(10)
    expect(typeof js === `string` && js.includes(`import `)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
