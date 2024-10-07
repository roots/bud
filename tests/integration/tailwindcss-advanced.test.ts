import setup from '@repo/test-kit/setup'
import {testIsCompiledCss, testIsCompiledJs} from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/tailwindcss-advanced`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      label: `@examples/tailwindcss-advanced`,
    })

    await test.install()
    await test.build()

    testIsCompiledCss(test.getAsset(`main.css`))
    expect(test.getAsset(`main.css`)).toMatch(
      /\*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}/,
    )

    testIsCompiledJs(test.getAsset(`main.js`))
    expect(test.getAsset(`main.js`)).toContain(`#4f46e5`)
  })
})
