import { ElementHandle } from 'playwright'
import {afterAll, beforeAll, describe, expect, it} from 'vitest'

import {close, page, path, read, setup, update} from './runner/index.js'

describe(`html output of examples/babel`, () => {
  let title: string | undefined
  let original: string | undefined
  let root: ElementHandle<any> | null

  beforeAll(async () => {
    await setup(`babel`)
    original = await read(path(`src`, `index.js`))
    title = await page.title()
    root = await page.$(`#root`)
  })

  afterAll(close)

  it(`should have expected default state`, async () => {
    expect(original).toMatchSnapshot()
    expect(title).toBe(`@examples/babel`)

    expect(
      await root?.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue(`background`),
      ),
    ).toMatchSnapshot(
      `rgb(88, 19, 213) none repeat scroll 0% 0% / auto padding-box border-box`,
    )

    expect(await page.$(`.updated`)).toBeFalsy()
  })

  it(`should update js modules`, async () => {
    await update(
      path(`src`, `app.js`),
      `\
  import '@src/app.css'

  document.querySelector('.init')?.classList.add('updated')

  if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)
  `,
    )

    expect(await page.$(`.updated`)).toBeTruthy()
  })

  it(`should update css modules`, async () => {
    await update(
      path(`src`, `app.css`),
      `\
  html,
  body {
    padding: 0;
    margin: 0;
  }

  #root{
    align-items: center;
    background: rgb(0,0,0);
    color: white;
    display: flex;
    font-family: sans-serif;
    height: 100vh;
    justify-content: center;
    letter-spacing: 0.2em;
    text-align: center;
    text-transform: uppercase;
    width: 100vw;
  }
  `,
    )

    expect(
      await root?.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue(`background`),
      ),
    ).toMatchSnapshot(
      `rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box`,
    )
  })
})
