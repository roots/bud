import setup from '@repo/test-kit/setup'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/babel-advanced`, () => {
  const test = setup({label: `@examples/babel-advanced`})

  beforeAll(async () => {
    await test.install()
    await test.build()
  })

  it(`should have expected stdout`, async () => {
    expect(
      test.stdout.split(`\n`).slice(2, -3).join(`\n`),
    ).toMatchSnapshot()
  })

  it(`should have expected manifest.json`, async () => {
    expect(test.manifest).toMatchSnapshot()
  })

  it(`should have expected entrypoints.json`, async () => {
    expect(test.entrypoints).toMatchSnapshot()
  })

  it(`should emit app.js`, async () => {
    expect(test.getAsset(`app.js`)).toMatchSnapshot()
  })

  it(`should emit app.css`, async () => {
    expect(test.getAsset(`app.css`)).toMatchSnapshot()
  })

  it(`should emit runtime.js`, async () => {
    expect(test.getAsset(`runtime.js`)).toMatchSnapshot()
  })
})
