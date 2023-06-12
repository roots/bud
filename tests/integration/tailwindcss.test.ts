import setup from '@repo/test-kit/setup'

import {describe, expect, it} from 'vitest'

describe(`examples/tailwindcss`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/tailwindcss`,
    })
    expect(await test.install()).not.toThrow()
    expect(await test.build()).not.toThrow()

    expect(test.assets[`app.css`].includes(`@import`)).toBeFalsy()
    expect(test.assets[`app.css`].includes(`@apply`)).toBe(false)
    expect(test.assets[`app.css`].match(/    /)).toBeFalsy()
    expect(test.assets[`app.css`].match(/\\n/)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
