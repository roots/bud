import {path} from '@repo/constants'
import {type Bud, factory} from '@roots/bud'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`multi-compiler`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      basedir: path(`tests`, `unit`),
      dry: true,
    })

    /**
     * Make `theme` workspace in `./theme` and setup entrypoints
     * Files will be output to `./theme/dist`
     */
    await bud.make(`theme`, async theme => {
      theme
        .setPath(`@src`, `theme/src`)
        .entry(`theme`, [`theme.js`, `theme.css`])
    })

    /**
     * Make plugin workspace in `./plugin` and setup entrypoints
     * Files will be output to `./plugin/dist`
     */
    await bud.make(`plugin`, async plugin =>
      plugin
        .setPath(`@src`, `plugin/src`)
        .entry(`plugin`, [`plugin.js`, `plugin.css`]),
    )
  })

  it(`theme path should match /theme\/src$/`, async () => {
    // @ts-ignore
    expect(bud.get(`theme`).path(`@src`)).toEqual(
      expect.stringMatching(/theme\/src$/),
    )
  })

  it(`should have root set`, async () => {
    expect(bud.isRoot).toEqual(true)
    expect(bud.get(`theme`).isRoot).toEqual(false)
    expect(bud.get(`theme`).root).toEqual(bud)
    expect(bud.get(`plugin`).isRoot).toEqual(false)
    expect(bud.get(`plugin`).root).toEqual(bud)
  })

  it(`children object is expected shape`, async () => {
    expect(bud.children).toEqual(
      expect.objectContaining({
        theme: expect.objectContaining({
          label: expect.stringMatching(/theme/),
        }),
        plugin: expect.objectContaining({
          label: expect.stringMatching(/plugin/),
        }),
      }),
    )
  })

  it(`has theme entry`, async () => {
    const theme = bud.get(`theme`)

    await theme.build.make()

    expect(theme.build.config.entry).toEqual(
      expect.objectContaining({
        theme: expect.objectContaining({
          import: expect.arrayContaining([`theme.js`, `theme.css`]),
        }),
      }),
    )
  })
})
