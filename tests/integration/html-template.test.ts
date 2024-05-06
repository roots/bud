import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/html-template`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/html-template`,
    })
    await test.install()
    await test.build()

    expect(test.assets[`index.html`]).toMatchSnapshot()
  })
})
