import {Build, Extension} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'

import {Config} from './babel.config'

/**
 * Babel support for `@roots/bud`
 *
 * @public
 */
export class BabelExtension extends Extension.Extension {
  /**
   * @public
   */
  public label = '@roots/bud-babel'

  /**
   * @public
   */
  protected get cacheDirectory() {
    return this.app.path(`@storage/cache/babel`)
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async options() {
    return {
      cacheDirectory: this.cacheDirectory,
      env: {
        development: {
          compact: false,
        },
      },
      root: this.app.path(),
    }
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.babel = new Config()

    this.app.build.setLoader('babel', this.resolve('babel-loader'))
    this.app.build.setItem('babel', this.setRuleSetItem)
    this.app.build.rules.js.setUse(items => ['babel', ...items])

    this.app.babel
      .setPresets({
        '@babel/preset-env': this.resolve('@babel/preset-env'),
      })
      .setPlugins({
        '@babel/plugin-transform-runtime': [
          this.resolve('@babel/plugin-transform-runtime'),
          {helpers: false},
        ],
        '@babel/plugin-proposal-object-rest-spread': this.resolve(
          '@babel/plugin-proposal-object-rest-spread',
        ),
        '@babel/plugin-syntax-dynamic-import': this.resolve(
          '@babel/plugin-syntax-dynamic-import',
        ),
        '@babel/plugin-proposal-class-properties': this.resolve(
          '@babel/plugin-proposal-class-properties',
        ),
      })
  }

  /**
   * @internal
   * @decorator `@bind`
   */
  @bind
  protected setRuleSetItem(ruleSetItem: Build.Item) {
    return ruleSetItem.setLoader('babel').setOptions(app => {
      const options = this.getOptions()

      app.babel?.presets &&
        options.set('presets', Object.values(app.babel.presets))

      app.babel?.plugins &&
        options.set('plugins', Object.values(app.babel.plugins))

      return options.all()
    })
  }
}
