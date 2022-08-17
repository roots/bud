import {Bud, factory} from '@repo/test-kit/bud'

describe(`bud.glob`, function () {
  let bud: Bud

  beforeAll(async () => (bud = await factory()))

  it(`is a function`, () => {
    expect(bud.glob).toBeInstanceOf(Function)
  })

  it(`returns glob results from string param`, async () => {
    const results = await bud.glob(`@src/**/*.js`)

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/app.js`),
        expect.stringContaining(`scripts/components/main.js`),
      ]),
    )
  })

  it(`returns glob results from array`, async () => {
    const results = await bud.glob([`src/**/*.js`, `src/**/app.*`])

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/app.js`),
        expect.stringContaining(`styles/app.css`),
        expect.stringContaining(`scripts/components/main.js`),
      ]),
    )
  })

  it(`returns glob results from variadic params`, async () => {
    const results = await bud.glob(`src/**/*.js`, `src/**/app.*`)

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`scripts/app.js`),
        expect.stringContaining(`styles/app.css`),
        expect.stringContaining(`scripts/components/main.js`),
      ]),
    )
  })

  it(`returns glob results with negation`, async () => {
    const results = await bud.glob(`src/**/*.js`, `!**/main.js`)

    expect(results).toEqual(
      expect.arrayContaining([expect.stringContaining(`scripts/app.js`)]),
    )
  })
})
