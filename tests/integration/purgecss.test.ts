import setup from '@repo/test-kit/setup'
import {testIsCompiledCss, testIsMinimized} from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/purgecss`, () => {
  it(`should compile js and css as expected`, async () => {
    const test = setup({label: `@examples/purgecss`})
    await test.install()
    await test.build()

    const css = test.assets[`main.css`]

    testIsCompiledCss(css)
    testIsMinimized(css)

    // matched in src/index.html
    expect(test.assets[`main.css`]).toMatch(/h1{.*}/)
    expect(test.assets[`main.css`]).toMatch(/h2{.*}/)

    // matched in src/index.js
    expect(test.assets[`main.css`]).toMatch(/\.include{.*}/)
    expect(test.assets[`main.css`]).toMatch(/\.comment-test{.*}/)

    // not matched in source
    expect(test.assets[`main.css`]).not.toMatch(/h3{.*}/)
    expect(test.assets[`main.css`]).not.toMatch(/div \.bar{.*}/)
  })
})
