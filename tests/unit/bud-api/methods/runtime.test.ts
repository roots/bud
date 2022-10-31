import '@roots/bud-api'

import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it} from 'vitest'

describe.skip(`bud.runtime`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it(`is a function`, () => {
    expect(bud.runtime).toBeInstanceOf(Function)
  })

  it(`enables runtime when called`, () => {
    bud.runtime({name: `test`})

    const runtimeChunk = bud.hooks.filter(
      `build.optimization.runtimeChunk`,
    ) as {name: string}

    expect(runtimeChunk.name).toEqual(`test`)
  })

  it(`can be passed a custom runtimeChunk config`, () => {
    bud.runtime(`single`)

    expect(bud.hooks.filter(`build.optimization.runtimeChunk`)).toEqual(
      `single`,
    )
  })

  it(`disables runtimeChunk when passed a boolean false`, () => {
    bud.runtime(false)

    expect(bud.hooks.filter(`build.optimization.runtimeChunk`)).toEqual(
      false,
    )
  })
})
