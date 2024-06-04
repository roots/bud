import setup from '@repo/test-kit/setup'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/critical-css`, {retry: 2, timeout: 240000}, () => {
  const test = setup({label: `@examples/critical-css`})

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

  it(`should emit extracted css`, async () => {
    expect(test.getAsset(`critical/css/app.css`)).toMatchSnapshot()
    expect(test.getAsset(`critical/css/app2.css`)).toMatchSnapshot()
  })

  it(`should emit css`, async () => {
    expect(test.getAsset(`app.css`)).toMatchSnapshot()
    expect(test.getAsset(`app2.css`)).toMatchSnapshot()
  })
})
