import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/babel`, () => {
  it(`should compile js as expected`, async () => {
    const test = setup({
      label: `@examples/babel`,
      projectDir: globalThis.__INTEGRATION__
        ? `storage/fixtures/babel`
        : `examples/babel`,
    })

    if (globalThis.__INTEGRATION__) {
      await test.install()
    }

    await test.build()
    expect(test.getAsset(`app.js`).length).toBeGreaterThan(10)
    expect(test.getAsset(`app.js`).includes(`import `)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
