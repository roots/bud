import {Build} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

import {Config} from './config'

/**
 * Babel support for `@roots/bud`
 *
 * @public
 */
@label('@roots/bud-babel')
export default class BabelExtension extends Extension<any, null> {
  protected get cacheDirectory() {
    return this.app.path(`@storage/cache/babel`)
  }

  protected get env() {
    return {
      development: {
        compact: false,
      },
    }
  }

  protected get root() {
    return this.app.path()
  }

  @bind
  protected setRuleSetItem(ruleSetItem: Build.Item) {
    return ruleSetItem.setLoader('babel').setOptions(app => ({
      cacheDirectory: this.cacheDirectory,
      presets: Object.values(this.app.babel.presets),
      plugins: Object.values(this.app.babel.plugins),
      env: this.env,
      root: this.root,
    }))
  }

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
}
