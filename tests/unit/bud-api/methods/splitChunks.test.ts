import {Bud, factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

describe(`bud.splitChunks`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    bud.hooks.on(`build.optimization.splitChunks`, undefined)
  })

  it(`sets default options when called`, async () => {
    bud.splitChunks()

    await bud.api.processQueue()

    expect(
      bud.hooks.filter(`build.optimization.splitChunks`),
    ).toMatchSnapshot()
  })

  it(`sets options when passed as parameters`, async () => {
    const param = {
      cacheGroups: {
        chunks: `all`,
      },
    }

    bud.splitChunks(param)

    await bud.api.processQueue()

    expect(
      bud.hooks.filter(`build.optimization.splitChunks`),
    ).toMatchSnapshot()
  })
})
