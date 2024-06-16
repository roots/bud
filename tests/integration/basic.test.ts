import setup from '@repo/test-kit/setup'
import {testIsCompiledCss, testIsCompiledJs} from '@repo/test-kit/tests'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/basic`, () => {
  const test = setup({label: `@examples/basic`})

  beforeAll(async () => {
    await test.install()
    await test.build()
  })

  it(`should emit stdout`, async () => {
    const stdout = await test.read(`build.stdout.log`)

    expect(stdout).toMatch(/│  ◉ js\/runtime\.js\s*✔ 904 bytes/)
    expect(stdout).toMatch(/│  ◉ css\/main\.css\s*✔ 27 bytes/)
    expect(stdout).toMatch(/│  ◉ js\/main\.js\s*✔ 200 bytes/)
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

  it(`should emit main.js`, async () => {
    expect(test.getAsset(`main.js`)).toMatchSnapshot()
  })

  it(`should emit runtime.js`, async () => {
    expect(test.getAsset(`runtime.js`)).toMatchSnapshot()
  })

  it(`should emit main.css`, async () => {
    expect(test.getAsset(`main.css`)).toMatchSnapshot()
  })
})
