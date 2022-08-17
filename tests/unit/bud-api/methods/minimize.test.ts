import {Bud, factory} from '@repo/test-kit/bud'

describe(`bud.minimize`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it(`is a function`, () => {
    expect(bud.minimize).toBeInstanceOf(Function)
  })

  it(`enables minimizing when called`, async () => {
    bud.minimize()
    await bud.build.make()

    expect(bud.build.config.optimization?.minimize).toEqual(true)
  })

  it(`disables minimizing when false is passed as param`, async () => {
    bud.minimize(false)

    await bud.build.make()

    expect(bud.build.config.optimization?.minimize).toEqual(false)
  })
})
