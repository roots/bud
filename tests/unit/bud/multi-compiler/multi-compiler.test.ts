import {paths} from '@repo/constants'
import {factory} from '@repo/test-kit/bud'
import {Bud} from '@roots/bud'
import {join} from 'path'

describe(`multi-compiler`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      basedir: join(paths.root, `tests`, `unit`, `bud`, `multi-compiler`),
    })

    /**
     * Make `theme` workspace in `./theme` and setup entrypoints
     * Files will be output to `./theme/dist`
     */
    await bud.make(
      {
        label: `theme`,
        basedir: bud.path(`theme`),
      },
      async theme => theme.entry(`theme`, [`theme.js`, `theme.css`]),
    )

    /**
     * Make plugin workspace in `./plugin` and setup entrypoints
     * Files will be output to `./plugin/dist`
     */
    await bud.make(
      {
        label: `plugin`,
        basedir: bud.path(`plugin`),
      },
      async plugin => plugin.entry(`plugin`, [`plugin.js`, `plugin.css`]),
    )
  })

  it(`string matches /theme\/src$/`, async () => {
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
    await bud.get(`theme`).build.make()

    expect(bud.get(`theme`).build.config.entry).toEqual(
      expect.objectContaining({
        theme: expect.objectContaining({
          import: expect.arrayContaining([`theme.js`, `theme.css`]),
        }),
      }),
    )
  })
})
