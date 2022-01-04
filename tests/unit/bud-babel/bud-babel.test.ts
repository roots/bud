import * as BudBabelExtension from '@roots/bud-babel'
import {Config} from '@roots/bud-babel/src/babel.config'

const RequiredBabel = require('@roots/bud-babel')

describe('@roots/bud-babel', function () {
  let config: Config

  beforeAll(async () => {
    config = new Config()
  })

  it('works with require', () => {
    expect(Object.keys(RequiredBabel)).toContain('name')
    expect(Object.keys(RequiredBabel)).toContain('register')
  })

  it('works with default import', () => {
    expect(Object.keys(BudBabelExtension)).toContain('name')
    expect(Object.keys(BudBabelExtension)).toContain('register')
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

    config.setPlugin('someBabelPlugin', [
      'someBabelPlugin',
      {foo: 'bar'},
    ])

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
