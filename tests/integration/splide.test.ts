import setup from '@repo/test-kit/setup'
import {describe, expect, it} from 'vitest'

describe(`examples/splide`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({
      label: `@examples/splide`,
    })
    await test.install()
    await test.build()

    expect(test.assets[`main.js`].length).toBeGreaterThan(10)
    expect(test.assets[`main.js`].includes(`@import`)).toBeFalsy()

    expect(test.assets[`runtime.js`].length).toBeGreaterThan(10)
    expect(test.assets[`runtime.js`].includes(`@import`)).toBeFalsy()

    const entries = Object.keys(test.assets).filter((key) => key.match(/css\/.*/))
    expect(entries.length).toEqual(1)

    const cssKey = entries.pop()
    expect(cssKey).toBeTypeOf(`string`)
    // for typescript...
    if (!cssKey) throw new Error(`cssKey is not a string`)

    expect(test.assets[cssKey]).toMatch(/.*\.splide__.*/)
  })
})
