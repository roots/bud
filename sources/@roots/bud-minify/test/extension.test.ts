import {type Bud, factory} from '@repo/test-kit'
import BudMinimize from '@roots/bud-minify'
import BudMinimizeCss from '@roots/bud-minify/minify-css'
import BudMinimizeJs from '@roots/bud-minify/minify-js'
import '@roots/bud-minify/types'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`@roots/bud-minify`, () => {
  let bud: Bud
  let instance: BudMinimize

  beforeAll(async () => {
    bud = await factory()
    instance = new BudMinimize(bud)
    await instance.register(bud)
  })

  it(`has label prop`, () => {
    expect(instance.label).toBe(`@roots/bud-minify`)
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
    expect(instance.js.options.terserOptions.compress.drop_console).toBe(
      false,
    )
    instance.js.dropConsole()
    expect(instance.js.options.terserOptions.compress.drop_console).toBe(
      true,
    )
    expect(instance.js.terserOptions.compress.drop_console).toBe(
      instance.js.options.terserOptions.compress.drop_console,
    )
  })

  it(`instance.js.mangle`, async () => {
    expect(instance.js.options.terserOptions.mangle).toStrictEqual({})
    instance.js.mangle({toplevel: true})
    expect(instance.js.options.terserOptions.mangle).toStrictEqual({
      toplevel: true,
    })
    expect(instance.js.terserOptions.mangle).toBe(
      instance.js.options.terserOptions.mangle,
    )
  })
})
