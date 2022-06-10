import {Bud, factory} from '@repo/test-kit/bud'
import {Config} from '@roots/bud-babel/config'
import BudBabelExtension from '@roots/bud-babel/extension'

describe('@roots/bud-babel', () => {
  let bud: Bud
  let config: Config
  let BabelInstance: BudBabelExtension

  beforeAll(async () => {
    bud = await factory()
    config = new Config()
    BabelInstance = new BudBabelExtension(bud)
  })

  it('object property checks', () => {
    expect(BabelInstance.label).toBeDefined()
    expect(BabelInstance.register).toBeDefined()
  })

  it('config class has a setPlugins', () => {
    expect(config.setPlugins).toBeInstanceOf(Function)
  })

  it('config class has a setPresets', () => {
    expect(config.setPresets).toBeInstanceOf(Function)
  })

  it('config class has a setPlugin', () => {
    expect(config.setPlugin).toBeInstanceOf(Function)
  })

  it('config class has a setPreset', () => {
    expect(config.setPreset).toBeInstanceOf(Function)
  })

  it('config class has a setPluginOptions', () => {
    expect(config.setPluginOptions).toBeInstanceOf(Function)
  })

  it('config class has a setPluginOptions', () => {
    expect(config.setPresetOptions).toBeInstanceOf(Function)
  })

  it('bud.babel.setPresets functions', () => {
    config.presets = {}

    const value: Record<string, [string, any]> = {
      '@babel/preset-env': ['@babel/preset-env', {foo: 'bar'}],
    }
    config.setPresets(value)

    expect(config.presets).toEqual(value)
  })

  it('bud.babel.setPreset functions', () => {
    config.presets = {}

    config.setPreset('@babel/preset-env', '@babel/preset-env')

    expect(config.presets).toEqual({
      '@babel/preset-env': ['@babel/preset-env'],
    })

    config.presets = {}

    config.setPreset('@babel/preset-env', [
      '@babel/preset-env',
      {foo: 'bar'},
    ])

    expect(config.presets).toEqual({
      '@babel/preset-env': ['@babel/preset-env', {foo: 'bar'}],
    })
  })

  it('bud.babel.setPlugin functions', () => {
    config.plugins = {}

    config.setPlugin('someBabelPlugin', 'someBabelPlugin')

    expect(config.plugins).toEqual({
      someBabelPlugin: ['someBabelPlugin'],
    })

    config.plugins = {}

    config.setPlugin('someBabelPlugin', ['someBabelPlugin', {foo: 'bar'}])

    expect(config.plugins).toEqual({
      someBabelPlugin: ['someBabelPlugin', {foo: 'bar'}],
    })
  })

  it('bud.babel.unsetPlugin functions', () => {
    config.plugins = {
      someBabelPlugin: ['someBabelPlugin'],
    }

    config.unsetPlugin('someBabelPlugin')

    expect(config.plugins).toEqual({})
  })

  it('bud.babel.unsetPreset functions', () => {
    config.presets = {
      someBabelPreset: ['someBabelPreset'],
    }

    config.unsetPreset('someBabelPreset')

    expect(config.presets).toEqual({})
  })
})
