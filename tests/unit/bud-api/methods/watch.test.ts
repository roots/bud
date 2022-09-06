import {Bud, factory} from '@repo/test-kit/bud'

describe(`bud.watch`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      mode: `development`,
    })
  })

  it(`is a function`, () => {
    expect(bud.watch).toBeInstanceOf(Function)
  })

  it(`should have expected default values`, async () => {
    const value = bud.hooks.filter(`dev.watch.files`)
    if (!(value instanceof Set))
      throw new Error(`watch files should be a set`)

    expect(Array.from(value)).toMatchSnapshot(expect.arrayContaining([]))
  })

  it(`merges watch files`, async () => {
    await bud.api.call(`watch`, `1/*.js`)

    const value = bud.hooks.filter(`dev.watch.files`)
    if (!(value instanceof Set))
      throw new Error(`watch files should be a set`)

    expect(Array.from(value)).toMatchSnapshot(
      expect.arrayContaining([`1/*.js`]),
    )
  })
})
