import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it} from 'vitest'

import {copyDir as copyDirFn} from './index.js'

describe(`bud.copyDir`, () => {
  let bud
  let copyDir: typeof copyDirFn

  beforeEach(async () => {
    bud = await factory()
    copyDir = copyDirFn.bind(bud)
    bud.extensions
      .get(`@roots/bud-extensions/copy-webpack-plugin`)
      .setOption(`patterns`, [])
  })

  it(`should be a function`, () => {
    expect(copyDir).toBeInstanceOf(Function)
  })

  it(`should have copy-webpack-plugin available`, () => {
    expect(
      bud.extensions.has(`@roots/bud-extensions/copy-webpack-plugin`),
    ).toBeTruthy()
  })

  it(`should add job when passed a string`, async () => {
    await copyDir(`images`)
    expect(
      bud.extensions.get(`@roots/bud-extensions/copy-webpack-plugin`)
        .options.patterns,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          from: `images`,
          to: `images/[path][name][ext]`,
          context: bud.path(`@src`),
        }),
      ]),
    )
  })

  it(`should add jobs when passed a tuple`, async () => {
    await copyDir([`images`, `foo/images`])

    const [patterna] = bud.extensions.get(
      `@roots/bud-extensions/copy-webpack-plugin`,
    ).options.patterns as any

    expect(patterna).toEqual(
      expect.objectContaining({
        from: `images`,
        to: `foo/images/[path][name][ext]`,
        context: bud.path(`@src`),
      }),
    )
  })
})
