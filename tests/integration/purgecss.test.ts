import setup from '@repo/test-kit/setup'
import {testIsCompiledCss, testIsMinimized} from '@repo/test-kit/tests'
import {describe, expect, it} from 'vitest'

describe(`examples/purgecss`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({label: `@examples/purgecss`})

    await test.install()
    await test.build()

    testIsCompiledCss(test.getAsset(`main.css`))
    testIsMinimized(test.getAsset(`main.css`))

    // matched in src/index.html
    expect(test.getAsset(`main.css`)).toMatch(/h1{.*}/)
    expect(test.getAsset(`main.css`)).toMatch(/h2{.*}/)

    // matched in src/index.js
    expect(test.getAsset(`main.css`)).toMatch(/\.include{.*}/)
    expect(test.getAsset(`main.css`)).toMatch(/\.comment-test{.*}/)

    // not matched in source
    expect(test.getAsset(`main.css`)).not.toMatch(/h3{.*}/)
    expect(test.getAsset(`main.css`)).not.toMatch(/div \.bar{.*}/)
  })
})
