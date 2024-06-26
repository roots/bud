import setup from '@repo/test-kit/setup'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`examples/sage-with-stylelint`, () => {
  const test = setup({
    dist: `public`,
    label: `@examples/sage-with-stylelint`,
  })

  beforeAll(async () => {
    await test.install()
    await test.build()
  })

  it(`should emit stdout`, async () => {
    const stdout = await test.read(`build.stdout.log`)

    expect(stdout).toMatch(/╭ sage-with-stylelint \[.*\]\s*\.\/public/)
    expect(stdout).toMatch(/◉ js\/runtime\.e02786\.js\s*✔ 972 bytes/)
    expect(stdout).toMatch(/◉ css\/app\.a2c3be\.css\s*✔ 6\.89 kB/)
    expect(stdout).toMatch(/◉ js\/app\.8db3d4\.js\s*✔ 548 bytes/)
    expect(stdout).toMatch(/◉ css\/editor\.8cd6ea\.css\s*✔ 178 bytes/)
    expect(stdout).toMatch(/◉ js\/editor\.798de8\.js\s*✔ 488 bytes/)
    expect(stdout).toMatch(
      /◉ images\/image\.7d0080dbfbeb5f56\.jpeg\s*761\.41 kB/,
    )
    expect(stdout).toMatch(
      /◉ images\/nested\/image\.7d0080\.jpeg\s*761\.41 kB/,
    )
    expect(stdout).toMatch(/◉ images\/logo\.f89599\.svg\s*1\.21 kB/)
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

  it(`should emit main.js`, async () => {
    expect(test.getAsset(`app.js`)).toMatchSnapshot()
  })

  it(`should emit editor.js`, async () => {
    expect(test.getAsset(`editor.js`)).toMatchSnapshot()
  })

  it(`should emit app.css`, async () => {
    expect(test.getAsset(`app.css`)).toMatchSnapshot()
  })

  it(`should emit editor.css`, async () => {
    expect(test.getAsset(`editor.css`)).toMatchSnapshot()
  })

  it(`should emit image.jpeg`, async () => {
    expect(test.getAsset(`image.jpeg`)).toMatchSnapshot()
  })

  it(`should emit image.svg`, async () => {
    expect(test.getAsset(`logo.svg`)).toMatchSnapshot()
  })

  it(`should emit nested/image.jpeg`, async () => {
    expect(test.getAsset(`nested/image.jpeg`)).toMatchSnapshot()
  })
})
