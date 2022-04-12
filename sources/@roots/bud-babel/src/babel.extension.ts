import {Bud, Build, Extension} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'

import {Config} from './babel.config'
import {DEFAULT_PLUGINS, DEFAULT_PRESETS} from './babel.constants'

export interface BabelExtension extends Extension.Extension {}

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
  public get cacheDirectory() {
    return this.app.path(`@storage/cache/babel`)
  }

  /**
   * @public
   */
  public get rootDirectory() {
    return this.app.path()
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
      root: this.rootDirectory,
    }
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register(app: Bud) {
    app.babel = new Config()

    app.build.setLoader('babel', require.resolve('babel-loader'))
    app.build.setItem('babel', this.setRuleSetItem)
    app.build.rules.js.setUse(items => ['babel', ...items])

    app.babel.setPresets(DEFAULT_PRESETS)
    app.babel.setPlugins(DEFAULT_PLUGINS)
  }

  /**
   * @internal
   * @decorator `@bind`
   */
  @bind
  public setRuleSetItem(ruleSetItem: Build.Item) {
    return ruleSetItem.setLoader('babel').setOptions(app => {
      const options = app.extensions.get('@roots/bud-babel').options

      app.babel?.presets &&
        options.set('presets', Object.values(app.babel.presets))

      app.babel?.plugins &&
        options.set('plugins', Object.values(app.babel.plugins))

      return options.all()
    })
  }
}
