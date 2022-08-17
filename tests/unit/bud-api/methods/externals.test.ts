import {Bud, factory} from '@repo/test-kit/bud'

describe(`bud.externals`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it(`is a function`, () => {
    expect(bud.externals).toBeInstanceOf(Function)
  })

  it(`modifies build.config.externals`, async () => {
    bud.externals({react: `window.React`})
    await bud.build.make()

    expect(bud.build.config.externals).toEqual({
      react: `window.React`,
    })
  })
})
