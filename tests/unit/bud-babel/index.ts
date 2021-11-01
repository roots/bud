import {factory, Framework} from '@roots/bud'
import * as BudBabelExtension from '@roots/bud-babel'
import {Config} from '@roots/bud-babel/src/babel.config'

const RequiredBabel = require('@roots/bud-babel')

describe('@roots/bud-babel', function () {
  let Config: Config

  let bud: Framework

  beforeAll(async () => {
    bud = await factory({config: {ci: true, log: false}})
    Config = new BudBabelExtension.Config()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('works with require', () => {
    expect(Object.keys(RequiredBabel)).toContain('name')
    expect(Object.keys(RequiredBabel)).toContain('register')
    expect(Object.keys(RequiredBabel)).toContain('boot')
  })

  it('works with default import', () => {
    expect(Object.keys(BudBabelExtension)).toContain('name')
    expect(Object.keys(BudBabelExtension)).toContain('register')
    expect(Object.keys(BudBabelExtension)).toContain('boot')
  })

  it('config class has a setPlugins', () => {
    expect(Config.setPlugins).toBeInstanceOf(Function)
  })

  it('config class has a setPresets', () => {
    expect(Config.setPresets).toBeInstanceOf(Function)
  })

  it('config class has a setPlugin', () => {
    expect(Config.setPlugin).toBeInstanceOf(Function)
  })

  it('config class has a setPreset', () => {
    expect(Config.setPreset).toBeInstanceOf(Function)
  })

  it('config class has a setPluginOptions', () => {
    expect(Config.setPluginOptions).toBeInstanceOf(Function)
  })

  it('config class has a setPluginOptions', () => {
    expect(Config.setPresetOptions).toBeInstanceOf(Function)
  })

  it('bud.babel.setPreset functions', () => {
    Config.presets = {}

    Config.setPreset('@babel/preset-env', '@babel/preset-env')

    expect(Config.presets).toEqual({
      '@babel/preset-env': ['@babel/preset-env', undefined],
    })

    Config.presets = {}

    Config.setPreset('@babel/preset-env', [
      '@babel/preset-env',
      {foo: 'bar'},
    ])

    expect(Config.presets).toEqual({
      '@babel/preset-env': ['@babel/preset-env', {foo: 'bar'}],
    })
  })

  it('bud.babel.setPlugin functions', () => {
    Config.plugins = {}

    Config.setPlugin('someBabelPlugin', 'someBabelPlugin')

    expect(Config.plugins).toEqual({
      someBabelPlugin: ['someBabelPlugin', undefined],
    })

    Config.plugins = {}

    Config.setPlugin('someBabelPlugin', [
      'someBabelPlugin',
      {foo: 'bar'},
    ])

    expect(Config.plugins).toEqual({
      someBabelPlugin: ['someBabelPlugin', {foo: 'bar'}],
    })
  })

  it('bud.babel.unsetPlugin functions', () => {
    Config.plugins = {
      someBabelPlugin: ['someBabelPlugin', undefined],
    }

    Config.unsetPlugin('someBabelPlugin')

    expect(Config.plugins).toEqual({})
  })

  it('bud.babel.unsetPreset functions', () => {
    Config.presets = {
      someBabelPreset: ['someBabelPreset', undefined],
    }

    Config.unsetPreset('someBabelPreset')

    expect(Config.presets).toEqual({})
  })
})
