import '@roots/bud-minify/types'

import {type Bud, factory} from '@repo/test-kit'
import {Extension} from '@roots/bud-framework/extension'
import {beforeAll, describe, expect, it} from 'vitest'

import BudMinimize from '@roots/bud-minify'
import BudMinimizeCss from '@roots/bud-minify/minify-css'
import BudMinimizeJs from '@roots/bud-minify/minify-js'

describe(`@roots/bud-minify`, () => {
  let bud: Bud
  let instance: BudMinimize

  beforeAll(async () => {
    bud = await factory()
    // @ts-ignore
    instance = new BudMinimize(bud)
    // @ts-ignore
    await instance.register(bud)
  })

  it(`has label prop`, () => {
    expect(instance.label).toBe(`@roots/bud-minify`)
  })

  it(`has options prop`, () => {
    expect(instance.js.options).toStrictEqual({
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

  it(`should expose minify.js`, async () => {
    expect(instance.js).toBeInstanceOf(BudMinimizeJs)
  })

  it(`should expose minify.css`, async () => {
    expect(instance.css).toBeInstanceOf(BudMinimizeCss)
  })

  it(`should set terserOptions.format.comments to false when minify.js.dropComments is called`, async () => {
    instance.js.dropComments()
    expect(instance.js.options.terserOptions.format.comments).toBe(false)
  })

  it(`should set terserOptions.compress.drop_debugger to true when minify.js.dropDebugger is called`, async () => {
    instance.js.dropDebugger()
    expect(instance.js.terserOptions.compress.drop_debugger).toBe(true)
  })

  it(`instance.js.dropConsole`, async () => {
    instance.js.dropConsole()
    expect(instance.js.options.terserOptions.compress.drop_console).toBe(
      true,
    )
  })

  it(`instance.js.mangle`, async () => {
    instance.js.mangle({toplevel: true})
    expect(instance.js.options.terserOptions.mangle).toStrictEqual({
      toplevel: true,
    })
  })
})
