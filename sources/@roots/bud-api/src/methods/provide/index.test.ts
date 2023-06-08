import {type Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {provide as provideFn} from './index.js'

describe(`bud.provide`, () => {
  let bud: Bud
  let provide: provideFn

  beforeEach(async () => {
    bud = await factory()
    provide = provideFn.bind(bud)
  })

  it(`should thrown when no packages are provided`, async () => {
    try {
      // @ts-ignore
      expect(await provide()).toThrowError(
        `bud.provide: packages must be an object`,
      )
    } catch (e) {}
  })

  it(`should call mockExtension.get when called`, async () => {
    const getSpy = vi.spyOn(bud.extensions, `get`)
    await provide({jquery: [`$`, `jQuery`]})

    expect(getSpy).toHaveBeenCalled()
  })

  it(`should call setOptions when called with an array`, async () => {
    const plugin = bud.extensions.get(
      `@roots/bud-extensions/webpack-provide-plugin`,
    )
    const setOptionsSpy = vi.spyOn(plugin, `setOptions`)
    await provide({jquery: [`$`, `jQuery`]})

    expect(setOptionsSpy).toHaveBeenCalledWith(
      expect.objectContaining({$: `jquery`, jQuery: `jquery`}),
    )
  })

  it(`should call setOptions when called with a string`, async () => {
    const plugin = bud.extensions.get(
      `@roots/bud-extensions/webpack-provide-plugin`,
    )
    const setOptionsSpy = vi.spyOn(plugin, `setOptions`)
    await provide({jquery: `$`})

    expect(setOptionsSpy).toHaveBeenCalledWith(
      expect.objectContaining({$: `jquery`}),
    )
  })

  it(`should handle [string, string]`, async () => {
    const plugin = bud.extensions.get(
      `@roots/bud-extensions/webpack-provide-plugin`,
    )
    const setOptionsSpy = vi.spyOn(plugin, `setOptions`)
    await provide(`value`, `accessor`)

    expect(setOptionsSpy).toHaveBeenCalledWith(
      expect.objectContaining({[`accessor`]: `value`}),
    )
  })

  it(`should handle [array, string]`, async () => {
    const plugin = bud.extensions.get(
      `@roots/bud-extensions/webpack-provide-plugin`,
    )
    const setOptionsSpy = vi.spyOn(plugin, `setOptions`)
    await provide([`lodash`, `isUndefined`], `isUndefined`)

    expect(setOptionsSpy).toHaveBeenCalledWith(
      expect.objectContaining({isUndefined: [`lodash`, `isUndefined`]}),
    )
  })

  it(`should handle [array, array]`, async () => {
    const plugin = bud.extensions.get(
      `@roots/bud-extensions/webpack-provide-plugin`,
    )
    const setOptionsSpy = vi.spyOn(plugin, `setOptions`)
    await provide([`lodash`, `chain`], [`chain`, `_chain`])

    expect(setOptionsSpy).toHaveBeenCalledWith(
      expect.objectContaining({chain: [`lodash`, `chain`]}),
    )
    expect(setOptionsSpy).toHaveBeenCalledWith(
      expect.objectContaining({_chain: [`lodash`, `chain`]}),
    )
  })

  it(`should return bud`, async () => {
    expect(await provide({foo: [`bar`]})).toEqual(bud)
  })
})
