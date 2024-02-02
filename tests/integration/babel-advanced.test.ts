import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/babel-advanced`, () => {
  it(`should compile js as expected`, async () => {
    const test = setup({
      label: `@examples/babel-advanced`,
    })
    await test.install()
    await test.build()

    expect(test.getAsset(`app.js`).length).toBeGreaterThan(10)
    expect(test.getAsset(`app.js`)).not.toMatch(/import /)
    expect(test.manifest).toMatchSnapshot()
  })
})
