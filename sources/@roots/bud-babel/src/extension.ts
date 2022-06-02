import {Build} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

import {Config} from './config.js'

/**
 * Babel support for `@roots/bud`
 *
 * @public
 */
@label('@roots/bud-babel')
export default class BabelExtension extends Extension<any, null> {
  /**
   * Babel cache directory
   *
   * @public
   */
  public get cacheDirectory() {
    return this.app.path(`@storage/cache/babel`)
  }

  /**
   * Babel env
   *
   * @public
   */
  public get env() {
    return {
      development: {
        compact: false,
      },
    }
  }

  /**
   * Root directory
   *
   * @public
   */
  public get root() {
    return this.app.path()
  }

  /**
   * Babel RuleSetItem callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setRuleSetItem(ruleSetItem: Build.Item) {
    return ruleSetItem.setLoader('babel').setOptions(() => ({
      cacheDirectory: this.cacheDirectory,
      presets: Object.values(this.app.babel.presets),
      plugins: Object.values(this.app.babel.plugins),
      env: this.env,
      root: this.root,
    }))
  }

  /**
   * Initialize extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async init() {
    Object.assign(this.app, {babel: new Config()})
  }

  /**
   * Register extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    const loader = this.resolve('babel-loader')
    const presetEnv = this.resolve('@babel/preset-env')
    const restSpread = this.resolve(
      '@babel/plugin-proposal-object-rest-spread',
    )
    const transformRuntime = this.resolve(
      '@babel/plugin-transform-runtime',
    )
    const dynamicImport = this.resolve(
      '@babel/plugin-syntax-dynamic-import',
    )
    const classProperties = this.resolve(
      '@babel/plugin-proposal-class-properties',
    )

    this.app.build
      .setLoader('babel', loader)
      .setItem('babel', this.setRuleSetItem)

    this.app.build.rules.js.setUse(items => ['babel', ...items])

    this.app.babel
      .setPresets({'@babel/preset-env': presetEnv})
      .setPlugins({
        '@babel/plugin-transform-runtime': [
          transformRuntime,
          {helpers: false},
        ],
        '@babel/plugin-proposal-object-rest-spread': restSpread,
        '@babel/plugin-syntax-dynamic-import': dynamicImport,
        '@babel/plugin-proposal-class-properties': classProperties,
      })
  }
}
