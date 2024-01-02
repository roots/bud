import {afterAll, beforeAll, describe, expect, it} from 'vitest'

import {close, page, path, read, setup, update} from './runner/index.js'

describe(`html output of examples/react`, () => {
  let original: string | undefined

  beforeAll(async () => {
    await setup(`react`).then(({page}) => page)
    original = await read(`src`, `components`, `App.js`)
  })

  afterAll(close)

  it(`should have expected default state`, async () => {
    expect(original).toMatchSnapshot()

    expect(
      await page
        .$(`.header img`)
        .then(async handle => await handle?.getAttribute(`class`)),
    ).toBe(`logo`)

    expect(
      await page
        .$(`.header .target`)
        .then(async handle => await handle?.innerHTML()),
    ).toBeUndefined()
  })

  it(`should rebuild on change`, async () => {
    await update(
      path(`src`, `components`, `App.js`),
      `\
      import logo from './logo.svg'

      export const App = () => {
        return (
          <div className="App">
            <div className="header">
              <img src={logo} className="logo" alt="logo" />
              <div className="target">Noice.</div>
            </div>
          </div>
        )
      }`,
    )

    expect(
      await page
        .$(`.header img`)
        .then(async handle => await handle?.getAttribute(`class`)),
    ).toBe(`logo`)

    expect(
      await page
        .$(`.header .target`)
        .then(async handle => await handle?.innerHTML()),
    ).toBe(`Noice.`)
  })
})
