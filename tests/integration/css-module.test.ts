import setup from '@repo/test-kit/setup'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/css-module`, () => {
  const test = setup({label: `@examples/css-module`})

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

  it(`should emit runtime.js`, async () => {
    expect(test.getAsset(`runtime.js`)).toMatchSnapshot()
  })

  it(`should emit css`, async () => {
    expect(test.getAsset(`main.css`)).toMatchSnapshot()
  })
})
