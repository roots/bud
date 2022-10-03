import {beforeAll, describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import BudTerser from './index'

describe(`@roots/bud-terser`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    // @ts-ignore
    bud.extensions.repository = {}
    await bud.extensions.add(BudTerser)
  })

  it(`has label prop`, () => {
    expect(bud.terser.label).toBe(`@roots/bud-terser`)
  })

  it(`has options prop`, () => {
    expect(bud.terser.options).toStrictEqual({
      extractComments: false,
      include: /\.(mjs|jsx?)$/,
      exclude: /(node_modules|bower_components)/,
      parallel: true,
      terserOptions: {
        compress: false,
        mangle: {
          safari10: true,
        },
        output: {
          ascii_only: true,
          comments: false,
          preamble: `/**
  * Minified by @roots/bud
  */`,
        },
      },
    })
  })

  it(`exposes self @ bud.terser`, async () => {
    expect(bud.terser).toBeInstanceOf(BudTerser)
  })

  it(`bud.terser.comments`, async () => {
    bud.terser.comments(true)
    expect(bud.terser.options.terserOptions.output.comments).toBe(true)
  })

  it(`bud.terser.dropComments`, async () => {
    bud.terser.dropComments()
    expect(bud.terser.options.terserOptions.output.comments).toBe(false)
  })

  it(`bud.terser.dropDebugger`, async () => {
    bud.terser.dropDebugger()
    expect(bud.terser.options.terserOptions.output.debugger).toBe(false)
  })

  it(`bud.terser.dropConsole`, async () => {
    bud.terser.dropConsole()
    expect(bud.terser.options.terserOptions.compress.drop_console).toBe(
      true,
    )
  })

  it(`bud.terser.mangle`, async () => {
    bud.terser.mangle({topLevel: true})
    expect(bud.terser.options.terserOptions.mangle).toStrictEqual({
      topLevel: true,
    })
  })
})
