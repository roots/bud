import {factory} from '@repo/test-kit/bud'
import {Extension} from '@roots/bud-framework/extension'
import {beforeAll, describe, expect, it} from 'vitest'

import {BudTerser} from './extension.js'

describe(`@roots/bud-terser`, () => {
  let bud

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
      parallel: true,
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          defaults: true,
          unused: true,
        },
        format: {
          ascii_only: true,
          comments: false,
        },
        mangle: {
          safari10: true,
        },
      },
    })
  })

  it(`exposes self @ bud.terser`, async () => {
    expect(bud.terser).toBeInstanceOf(Extension)
  })

  it(`bud.terser.comments`, async () => {
    bud.terser.comments(true)
    expect(bud.terser.options.terserOptions.format.comments).toBe(true)
  })

  it(`bud.terser.dropComments`, async () => {
    bud.terser.dropComments()
    expect(bud.terser.options.terserOptions.format.comments).toBe(false)
  })

  it(`bud.terser.dropDebugger`, async () => {
    bud.terser.dropDebugger()
    expect(bud.terser.options.terserOptions.compress.drop_debugger).toBe(
      true,
    )
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
