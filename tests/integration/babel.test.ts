import setup from '@repo/test-kit/setup'
import {testIsCompiledCss, testIsCompiledJs} from '@repo/test-kit/tests'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/babel`, () => {
  const test = setup({label: `@examples/babel`})

  beforeAll(async () => {
    await test.install()
    await test.build()
  })

  it(`should emit stdout`, async () => {
    expect(
      (await test.read(`build.stdout.log`))
        .split(`\n`)
        .slice(2, -3)
        .join(`\n`),
    ).toMatchSnapshot()
  })

  it(`should not emit stderr`, async () => {
    expect(await test.read(`build.stderr.log`)).toBeUndefined()
  })

  it(`should emit manifest.json`, async () => {
    expect(test.manifest).toMatchSnapshot()
  })

  it(`should emit entrypoints.json`, async () => {
    expect(test.entrypoints).toMatchSnapshot()
  })

  it(`should compile js as expected`, async () => {
    testIsCompiledJs(test.getAsset(`main.js`))
    testIsCompiledJs(test.getAsset(`runtime.js`))
    testIsCompiledCss(test.getAsset(`main.css`))
  })
})
