import {afterAll, beforeAll, describe, expect, it} from 'vitest'

import {close, page, path, read, setup, update} from './runner/index.js'

describe(`html output of examples/swc`, () => {
  let original: string | undefined

  beforeAll(async () => {
    await setup(`swc`)
    original = await read(`src`, `index.js`)
  })

  afterAll(close)

  it(`should have expected default state`, async () => {
    expect(original).toMatchSnapshot()
  })

  it(`should rebuild on change`, async () => {
    await update(
      path(`src`, `index.js`),
      `\
import './styles.css'

document.querySelector(\`body\`).classList.add(\`hot\`)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error)
}`,
    )

    expect(await page.$(`.hot`)).toBeTruthy()
  })
})
