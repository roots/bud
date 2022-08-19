import {Bud, factory} from '@repo/test-kit/bud'

describe(`bud.hash`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.api.call(`hash`)
    await bud.build.make()
  })

  it(`is a function`, () => {
    expect(bud.hash).toBeInstanceOf(Function)
  })

  it(`enables hashing when called`, async () => {
    expect(bud.build.config.output.filename).toEqual(
      `js/[name].[contenthash:6].js`,
    )
  })
})
