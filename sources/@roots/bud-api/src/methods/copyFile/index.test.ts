import {factory} from '@repo/test-kit'
import {copyFile as copyFileFn} from '@roots/bud-api/methods/copyFile'
import {beforeEach, describe, expect, it} from 'vitest'

describe(`bud.copyFile`, () => {
  let bud
  let copyFile: typeof copyFileFn

  beforeEach(async () => {
    bud = await factory()
    copyFile = copyFileFn.bind(bud)
    bud.extensions
      .get(`@roots/bud-extensions/copy-webpack-plugin`)
      .setOption(`patterns`, [])
  })

  it(`should be a function`, () => {
    expect(copyFile).toBeInstanceOf(Function)
  })

  it(`should have copy-webpack-plugin available`, () => {
    expect(
      bud.extensions.has(`@roots/bud-extensions/copy-webpack-plugin`),
    ).toBeTruthy()
  })

  it(`should add job when passed an array of strings`, async () => {
    await copyFile(`images/image.jpeg`)
    expect(
      bud.extensions.get(`@roots/bud-extensions/copy-webpack-plugin`)
        .options.patterns,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          context: expect.stringMatching(/tests\/util\/project\/src$/),
          from: `images/image.jpeg`,
          to: `images/[path][name][ext]`,
        }),
      ]),
    )
  })

  it(`should add jobs when passed tuple`, async () => {
    await copyFile([`images/image.jpeg`, `foo/image.jpeg`])

    const [pattern] = bud.extensions.get(
      `@roots/bud-extensions/copy-webpack-plugin`,
    ).options.patterns as any

    expect(pattern).toEqual(
      expect.objectContaining({
        context: expect.stringMatching(/tests\/util\/project\/src$/),
        from: `images/image.jpeg`,
        to: `foo/image.jpeg`,
      }),
    )
  })
})
