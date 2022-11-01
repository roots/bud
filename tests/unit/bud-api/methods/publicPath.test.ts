import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`bud.publicPath`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.build.make()
  })

  it(`publicPath: is a function`, () => {
    expect(bud.publicPath).toBeInstanceOf(Function)
  })

  it(`publicPath: returns the correct default publicPath`, () => {
    expect(bud.publicPath()).toEqual(`auto`)
    expect(bud.publicPath()).toEqual(bud.build.config.output?.publicPath)
  })

  it(`setPublicPath: is a function`, () => {
    expect(bud.setPublicPath).toBeInstanceOf(Function)
  })

  it(`setPublicPath: sets publicPath when called`, async () => {
    const newPath = `/foo`

    // @ts-ignore
    bud.setPublicPath(newPath)

    await bud.build.make()

    expect(bud.build.config.output?.publicPath).toEqual(`/foo/`)
  })
})
