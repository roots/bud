import setup from '@repo/test-kit/setup'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/critical-css`, {retry: 2, timeout: 240000}, () => {
  const test = setup({label: `@examples/critical-css`})

  beforeAll(async () => {
    await test.install()
    await test.build()
  })

  it(`should emit stdout`, async () => {
    const stdout = await test.read(`build.stdout.log`)

    expect(stdout).toMatch(/│ app\n│  ◉ js\/runtime\.js\s*✔ 904 bytes/)
    expect(stdout).toMatch(/│  ◉ css\/app\.css\s*✔ 2.78 kB/)

    expect(stdout).toMatch(/│ app2\n│  ◉ js\/runtime\.js\s*✔ 904 bytes/)
    expect(stdout).toMatch(/│  ◉ css\/app2\.css\s*✔ 2.75 kB/)

    expect(stdout).toMatch(/│ assets\n│  ◉ index\.html\s*307 bytes/)
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
