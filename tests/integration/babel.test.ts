import setup from '@repo/test-kit/setup'
import {testIsCompiledCss, testIsCompiledJs} from '@repo/test-kit/tests'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/babel`, () => {
  const test = setup({label: `@examples/babel`})

  beforeAll(async () => {
    await test.install()
    await test.build()
  })

  it(`should have expected stdout`, async () => {
    expect(
      test.stdout.split(`\n`).slice(0, -3).join(`\n`),
    ).toMatchSnapshot()
  })

  it(`should have expected manifest.json`, async () => {
    expect(test.manifest).toMatchSnapshot()
  })

  it(`should have expected entrypoints.json`, async () => {
    expect(test.entrypoints).toMatchSnapshot()
  })

  it(`should compile js as expected`, async () => {
    testIsCompiledJs(test.getAsset(`main.js`))
    testIsCompiledJs(test.getAsset(`runtime.js`))
    testIsCompiledCss(test.getAsset(`main.css`))
  })
})
