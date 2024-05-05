import {afterAll, beforeAll, describe, expect, it} from 'vitest'

import {close, page, path, read, setup, update} from './runner/index.js'

describe(`html output of examples/basic`, () => {
  beforeAll(async () => await setup(`basic`))

  afterAll(close)

  it(`should have expected default state`, async () => {
    expect(await read(`src`, `index.js`)).toMatchSnapshot()
  })

  it(`should rebuild on change`, async () => {
    await update(
      path(`src`, `index.js`),
      `\
    import './styles.css'

    document.querySelector('#root').classList.add('hot')

    if (import.meta.webpackHot) {
      import.meta.webpackHot.accept(console.error)
    }`,
    )

    expect(await page.$(`.hot`)).toBeTruthy()
  })
})
