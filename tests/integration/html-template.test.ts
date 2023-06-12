import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe(`examples/html-template`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/html-template`,
    })
    expect(test.assets[`index.html`]).toMatchSnapshot()
  })
})
