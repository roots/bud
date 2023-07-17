import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/sass-tailwindcss`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/sass-tailwindcss`,
    })
    await test.install()
    await test.build()

    expect(test.assets[`app.css`].includes(`@import`)).toBeFalsy()
    expect(test.assets[`app.css`].includes(`@apply`)).toBe(false)
    expect(test.assets[`app.css`].match(/    /)).toBeFalsy()
    expect(test.assets[`app.css`].match(/\\n/)).toBeFalsy()
    expect(test.manifest).toMatchSnapshot()
  })
})
