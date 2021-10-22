import {factory, Framework} from '@roots/bud'
import * as BudBabelExtension from '@roots/bud-babel'
import {Config} from '@roots/bud-babel/src/babel.config'

const RequiredBabel = require('@roots/bud-babel')

describe('@roots/bud-babel', function () {
  let Config: Config

  let bud: Framework

  beforeAll(() => {
    bud = factory()
    Config = new BudBabelExtension.Config(bud)
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

  it('has expected default plugins', () => {
    expect(BudBabelExtension.DEFAULT_PLUGINS).toMatchSnapshot([
      ['@babel/plugin-transform-runtime', {helpers: false}],
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
    ])
  })

  it('has correctly interpreted default plugins', () => {
    Config.setPlugins(BudBabelExtension.DEFAULT_PLUGINS)

    expect(Config.plugins).toMatchSnapshot({
      '@babel/plugin-transform-runtime': [
        '@babel/plugin-transform-runtime',
        {helpers: false},
      ],
      '@babel/plugin-proposal-object-rest-spread': [
        '@babel/plugin-proposal-object-rest-spread',
        {},
      ],
      '@babel/plugin-syntax-dynamic-import': [
        '@babel/plugin-syntax-dynamic-import',
        {},
      ],
      '@babel/plugin-proposal-class-properties': [
        '@babel/plugin-proposal-class-properties',
        {},
      ],
    })
  })

  it('has expected default presets', () => {
    expect(BudBabelExtension.DEFAULT_PRESETS).toMatchSnapshot([
      '@babel/preset-env',
    ])
  })

  it('has correctly interpreted default plugins', () => {
    Config.setPresets(BudBabelExtension.DEFAULT_PRESETS)

    expect(Config.presets).toMatchSnapshot({
      '@babel/preset-env': ['@babel/preset-env', {}],
    })
  })

  it('bud.babel.setPreset functions', () => {
    Config.presets = {}

    Config.setPreset('@babel/preset-env')

    expect(Config.presets).toEqual({
      '@babel/preset-env': ['@babel/preset-env', {}],
    })

    Config.presets = {}

    Config.setPreset(['@babel/preset-env', {foo: 'bar'}])

    expect(Config.presets).toEqual({
      '@babel/preset-env': ['@babel/preset-env', {foo: 'bar'}],
    })
  })

  it('bud.babel.setPlugin functions', () => {
    Config.plugins = {}

    Config.setPlugin('someBabelPlugin')

    expect(Config.plugins).toEqual({
      someBabelPlugin: ['someBabelPlugin', {}],
    })

    Config.plugins = {}

    Config.setPlugin(['someBabelPlugin', {foo: 'bar'}])

    expect(Config.plugins).toEqual({
      someBabelPlugin: ['someBabelPlugin', {foo: 'bar'}],
    })
  })

  it('bud.babel.unsetPlugin functions', () => {
    Config.plugins = {
      someBabelPlugin: ['someBabelPlugin', {}],
    }

    Config.unsetPlugin('someBabelPlugin')

    expect(Config.plugins).toEqual({})
  })

  it('bud.babel.unsetPreset functions', () => {
    Config.presets = {
      someBabelPreset: ['someBabelPreset', {}],
    }

    Config.unsetPreset('someBabelPreset')

    expect(Config.presets).toEqual({})
  })

  it('bud.babel.normalizeEntry is a function', () => {
    expect(Config.normalizeEntry).toBeInstanceOf(Function)
  })

  it('bud.babel.normalizeEntry normalizes plugins', () => {
    const plugin = 'foo'
    const result = Config.normalizeEntry(plugin)

    expect(result).toMatchSnapshot(['foo', {}])
  })

  it('bud.babel.app returns app', () => {
    expect(Config.app).toBeInstanceOf(Framework)
  })
})
