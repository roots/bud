import type {Build} from '@roots/bud-framework'
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
    this.app.babel = new Config()
  }

  /**
   * Register extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.build
      .setLoader('babel', await this.resolve('babel-loader'))
      .setItem('babel', this.setRuleSetItem)

    this.app.build.rules.js.setUse(items => ['babel', ...items])

    this.app.babel
      .setPresets({
        '@babel/preset-env': await this.resolve('@babel/preset-env'),
      })
      .setPlugins({
        '@babel/plugin-transform-runtime': [
          await this.resolve('@babel/plugin-transform-runtime'),
          {helpers: false},
        ],
        '@babel/plugin-proposal-object-rest-spread': await this.resolve(
          '@babel/plugin-proposal-object-rest-spread',
        ),
        '@babel/plugin-syntax-dynamic-import': await this.resolve(
          '@babel/plugin-syntax-dynamic-import',
        ),
        '@babel/plugin-proposal-class-properties': await this.resolve(
          '@babel/plugin-proposal-class-properties',
        ),
      })
  }
}
