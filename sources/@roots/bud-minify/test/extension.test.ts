import {type Bud, factory} from '@repo/test-kit/bud'
import {Extension} from '@roots/bud-framework/extension'
import {beforeAll, describe, expect, it} from 'vitest'

import BudMinimize from '@roots/bud-minify'

describe(`@roots/bud-minify`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()

    // @ts-ignore dangerously reset extension repo
    bud.extensions.repository = {}

    await bud.extensions.add(BudMinimize)
  })

  it(`has label prop`, () => {
    expect(bud.minify.label).toBe(`@roots/bud-minify`)
  })

  it(`has options prop`, () => {
    expect(bud.minify.js.options).toStrictEqual({
      minify: expect.any(Function),
      extractComments: false,
      parallel: true,
      terserOptions: {
        compress: {
          defaults: true,
          drop_console: false,
          drop_debugger: true,
          unused: true,
        },
        ecma: undefined,
        enclose: undefined,
        format: {
          ascii_only: true,
          comments: false,
        },
        ie8: undefined,
        keep_classnames: undefined,
        keep_fnames: undefined,
        mangle: {
          safari10: true,
        },
        module: undefined,
        nameCache: undefined,
        parse: undefined,
        safari10: undefined,
        sourceMap: undefined,
        toplevel: undefined,
      },
    })
  })

  it(`exposes bud.minify.js`, async () => {
    expect(bud.minify.js).toBeInstanceOf(Extension)
  })

  it(`bud.minify.js.dropComments`, async () => {
    bud.minify.js.dropComments()
    expect(bud.minify.js.options.terserOptions.format.comments).toBe(false)
  })

  it(`bud.minify.js.dropDebugger`, async () => {
    bud.minify.js.dropDebugger()
    expect(bud.minify.js.terserOptions.compress.drop_debugger).toBe(true)
  })

  it(`bud.minify.js.dropConsole`, async () => {
    bud.minify.js.dropConsole()
    expect(bud.minify.js.options.terserOptions.compress.drop_console).toBe(
      true,
    )
  })

  it(`bud.minify.js.mangle`, async () => {
    bud.minify.js.mangle({toplevel: true})
    expect(bud.minify.js.options.terserOptions.mangle).toStrictEqual({
      toplevel: true,
    })
  })
})
