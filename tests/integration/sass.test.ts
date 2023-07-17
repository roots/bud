import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/sass`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/sass`,
    })
    await test.install()
    await test.build()

    expect(test.assets[`main.css`].length).toBeGreaterThan(10)
    expect(test.assets[`main.css`].includes(`import`)).toBeFalsy()
    expect(test.assets[`main.css`]).toMatchSnapshot()
    expect(test.manifest).toMatchSnapshot()
  })
}, 100000)
