import setup from '@repo/test-kit/setup'
import {testIsCompiledJs} from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/splide`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/splide`,
    })
    await test.install()
    await test.build()

    testIsCompiledJs(test.getAsset(`main.js`))
    testIsCompiledJs(test.getAsset(`runtime.js`))

    const entries = Object.keys(test.assets).filter(key =>
      key.match(/css\/.*/),
    )
    expect(entries.length).toEqual(1)

    const cssKey = entries.pop()
    expect(cssKey).toBeTypeOf(`string`)
    // for typescript...
    if (!cssKey) throw new Error(`cssKey is not a string`)

    expect(test.getAsset(cssKey)).toMatch(/.*\.splide__.*/)
  })
})
