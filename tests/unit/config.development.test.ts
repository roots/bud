import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it, vi} from 'vitest'

describe(`[dev] bud.build.config`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: `development`})
    await bud.build.make()
  })

  it(`has expected bail default`, () => {
    expect(bud.build.config.bail).toEqual(false)
  })

  it(`has expected mode default`, () => {
    expect(bud.build.config.mode).toEqual(`development`)
  })
})
