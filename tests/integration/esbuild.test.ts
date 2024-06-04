import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/esbuild`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/esbuild`,
    })
    await test.install()
    await test.build()

    expect(test.manifest[`main.js`]).toBe(`js/main.js`)
    expect(test.manifest[`runtime.js`]).toBe(`js/runtime.js`)

    expect(test.getAsset(`main.js`)).toMatchSnapshot()
    expect(test.getAsset(`runtime.js`)).toMatchSnapshot()
  })
})
