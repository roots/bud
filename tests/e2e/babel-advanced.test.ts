import {afterAll, beforeAll, describe, expect, it} from 'vitest'

import {close, page, path, read, setup, update} from './runner/index.js'

describe(`@examples/babel-advanced`, () => {
  beforeAll(async () => await setup(`babel-advanced`))
  afterAll(close)

  it(`should have expected default state`, async () => {
    expect(await read(path(`src`, `app.js`))).toMatchSnapshot()
    expect(await page.title()).toBe(`@examples/babel-advanced`)

    const root = await page.$(`#root`)
    expect(
      await root?.evaluate(element =>
        window.getComputedStyle(element).getPropertyValue(`background`),
      ),
    ).toMatchInlineSnapshot(`"rgb(88, 19, 213) none repeat scroll 0% 0% / auto padding-box border-box"`)

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

    const root = await page.$(`#root`)
    expect(
      await root?.evaluate(el =>
        window.getComputedStyle(el).getPropertyValue(`background`),
      ),
    ).toMatchSnapshot(
      `rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box`,
    )
  })
})
