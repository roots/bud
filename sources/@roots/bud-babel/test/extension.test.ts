import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it} from 'vitest'

import BabelExtension from '../src/index'

describe(`@roots/bud-babel`, () => {
  let bud: Bud
  let BabelInstance: BabelExtension

  beforeEach(async () => {
    bud = await factory()
    BabelInstance = new BabelExtension(bud)
  })

  it(`should have label`, async () => {
    expect(BabelInstance.label).toBeDefined()
  })

  it(`should have register method`, async () => {
    expect(BabelInstance.register).toBeDefined()
  })

  it(`config class shoudl have setPlugins`, async () => {
    expect(BabelInstance.setPlugins).toBeInstanceOf(Function)
  })

  it(`config class shoudl have setPresets`, async () => {
    expect(BabelInstance.setPresets).toBeInstanceOf(Function)
  })

  it(`config class shoudl have setPlugin`, async () => {
    expect(BabelInstance.setPlugin).toBeInstanceOf(Function)
  })

  it(`config class shoudl have setPreset`, async () => {
    expect(BabelInstance.setPreset).toBeInstanceOf(Function)
  })

  it(`config class shoudl have setPluginOptions`, async () => {
    expect(BabelInstance.setPluginOptions).toBeInstanceOf(Function)
  })

  it(`config class shoudl have setPluginOptions`, async () => {
    expect(BabelInstance.setPresetOptions).toBeInstanceOf(Function)
  })

  it(`bud.babel.setPresets should behave as expected`, async () => {
    BabelInstance.presets = {}

    const value: Record<string, [string, any]> = {
      '@babel/preset-env': [`@babel/preset-env`, {foo: `bar`}],
    }
    BabelInstance.setPresets(value)

    expect(BabelInstance.presets).toEqual(value)
  })

  it(`bud.babel.setPreset should set based on params`, async () => {
    BabelInstance.presets = {}
    BabelInstance.setPreset(`@babel/preset-env`, `@babel/preset-env`)

    expect(BabelInstance.presets).toEqual({
      '@babel/preset-env': [`@babel/preset-env`],
    })

    BabelInstance.presets = {}
    BabelInstance.setPreset(`@babel/preset-env`, [
      `@babel/preset-env`,
      {foo: `bar`},
    ])

    expect(BabelInstance.presets).toEqual({
      '@babel/preset-env': [`@babel/preset-env`, {foo: `bar`}],
    })
  })

  it(`bud.babel.setPlugin should set based on params`, async () => {
    BabelInstance.plugins = {}

    BabelInstance.setPlugin(`someBabelPlugin`, `someBabelPlugin`)

    expect(BabelInstance.plugins).toEqual({
      someBabelPlugin: [`someBabelPlugin`],
    })

    BabelInstance.plugins = {}

    BabelInstance.setPlugin(`someBabelPlugin`, [
      `someBabelPlugin`,
      {foo: `bar`},
    ])

    expect(BabelInstance.plugins).toEqual({
      someBabelPlugin: [`someBabelPlugin`, {foo: `bar`}],
    })
  })

  it(`bud.babel.unsetPlugin should behave as expected`, async () => {
    BabelInstance.plugins = {
      someBabelPlugin: [`someBabelPlugin`],
    }

    BabelInstance.unsetPlugin(`someBabelPlugin`)

    expect(BabelInstance.plugins).toEqual({})
  })

  it(`bud.babel.unsetPreset should behave as expected`, async () => {
    BabelInstance.presets = {
      someBabelPreset: [`someBabelPreset`],
    }

    BabelInstance.unsetPreset(`someBabelPreset`)

    expect(BabelInstance.presets).toEqual({})
  })

  it(`should have a setEnv method`, async () => {
    expect(BabelInstance.setEnv)
  })

  it(`should have a setEnv method`, async () => {
    expect(BabelInstance.setEnv)
  })
})
