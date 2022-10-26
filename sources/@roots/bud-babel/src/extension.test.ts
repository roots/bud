import '@roots/bud'

import {beforeAll, describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import BudBabelExtension from './index'

describe(`@roots/bud-babel`, () => {
  let bud: Bud
  let BabelInstance: BudBabelExtension

  beforeAll(async () => {
    bud = await factory()
    BabelInstance = new BudBabelExtension(
      // @ts-ignore
      bud,
    )
  })

  it(`should have label`, () => {
    expect(BabelInstance.label).toBeDefined()
  })

  it(`should have register method`, () => {
    expect(BabelInstance.register).toBeDefined()
  })

  it(`should have configAfter method`, () => {
    expect(BabelInstance.configAfter).toBeDefined()
  })

  it(`config class has a setPlugins`, () => {
    expect(BabelInstance.setPlugins).toBeInstanceOf(Function)
  })

  it(`config class has a setPresets`, () => {
    expect(BabelInstance.setPresets).toBeInstanceOf(Function)
  })

  it(`config class has a setPlugin`, () => {
    expect(BabelInstance.setPlugin).toBeInstanceOf(Function)
  })

  it(`config class has a setPreset`, () => {
    expect(BabelInstance.setPreset).toBeInstanceOf(Function)
  })

  it(`config class has a setPluginOptions`, () => {
    expect(BabelInstance.setPluginOptions).toBeInstanceOf(Function)
  })

  it(`config class has a setPluginOptions`, () => {
    expect(BabelInstance.setPresetOptions).toBeInstanceOf(Function)
  })

  it(`bud.babel.setPresets functions`, () => {
    BabelInstance.presets = {}

    const value: Record<string, [string, any]> = {
      '@babel/preset-env': [`@babel/preset-env`, {foo: `bar`}],
    }
    BabelInstance.setPresets(value)

    expect(BabelInstance.presets).toEqual(value)
  })

  it(`bud.babel.setPreset functions`, () => {
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

  it(`bud.babel.setPlugin functions`, () => {
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

  it(`bud.babel.unsetPlugin functions`, () => {
    BabelInstance.plugins = {
      someBabelPlugin: [`someBabelPlugin`],
    }

    BabelInstance.unsetPlugin(`someBabelPlugin`)

    expect(BabelInstance.plugins).toEqual({})
  })

  it(`bud.babel.unsetPreset functions`, () => {
    BabelInstance.presets = {
      someBabelPreset: [`someBabelPreset`],
    }

    BabelInstance.unsetPreset(`someBabelPreset`)

    expect(BabelInstance.presets).toEqual({})
  })

  it(`should have a setEnv method`, () => {
    expect(BabelInstance.setEnv)
  })

  it(`should have a setEnv method`, () => {
    expect(BabelInstance.setEnv)
  })
})
