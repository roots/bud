import setup from '@repo/test-kit/setup'
import {testIsCompiledCss, testIsCompiledJs} from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/react`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({label: `@examples/react`})

    await test.install()
    await test.build()

    testIsCompiledJs(test.getAsset(`main.js`))
    expect(test.manifest[`runtime.js`]).toMatchSnapshot()

    testIsCompiledCss(test.getAsset(`main.css`))
    expect(test.manifest[`main.css`]).toMatchSnapshot()

    testIsCompiledJs(test.getAsset(`runtime.js`))
    expect(test.manifest[`runtime.js`]).toMatchSnapshot()

    expect(test.assetString(`components/logo.svg`).length).toBeGreaterThan(
      10,
    )
    expect(
      test.assetString(`components/logo.svg`).includes(`<svg`),
    ).toBeTruthy()
    expect(test.manifest[`components/logo.svg`]).toMatchSnapshot()

    expect(Object.keys(test.manifest).length).toBeGreaterThanOrEqual(5)
  })
})
