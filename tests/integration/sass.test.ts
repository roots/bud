import setup from '@repo/test-kit/setup'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/sass`, () => {
  const test = setup({label: `@examples/sass`})

  beforeAll(async () => {
    await test.install()
    await test.build()
  })

  it(`should emit stdout`, async () => {
    const stdout = await test.read(`build.stdout.log`)

    expect(stdout).toMatch(/╭ sass \[.*\]\s*\.\/dist/)
    expect(stdout).toMatch(/│  ◉ js\/runtime\.js\s*✔ 904 bytes/)
    expect(stdout).toMatch(/│  ◉ css\/main\.css\s*✔ 731 bytes/)
    expect(stdout).toMatch(/2 modules \[0\/2 modules cached\]/)
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

  it(`should emit main.css`, async () => {
    expect(test.getAsset(`main.css`)).toMatchSnapshot()
  })
}, 100000)
