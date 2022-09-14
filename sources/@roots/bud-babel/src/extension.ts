import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

import {Config} from './config.js'

/**
 * Babel support for `@roots/bud`
 *
 * @public
 */
@label(`@roots/bud-babel`)
export default class BabelExtension extends Extension {
  /**
   * Babel cache directory
   *
   * @public
   */
  public get cacheDirectory() {
    return this.app.path(
      `@storage`,
      this.app.label,
      `cache`,
      this.app.mode,
      `babel`,
    )
  }

  /**
   * Babel env
   *
   * @public
   */
  public get env() {
    return {
      development: {compact: false},
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
   * Init callback
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
    this.app.babel
      .setPreset(`@babel/preset-env`)
      .setPlugin([`@babel/plugin-transform-runtime`, {helpers: false}])
      .setPlugin(`@babel/plugin-proposal-object-rest-spread`)
      .setPlugin(`@babel/plugin-proposal-class-properties`)
      .setPlugin(`@babel/plugin-syntax-dynamic-import`)

    this.app.build.setLoader(`babel-loader`).setItem(`babel`, item =>
      item.setLoader(`babel-loader`).setOptions(() => ({
        cacheDirectory: this.cacheDirectory,
        presets: Object.values(this.app.babel.presets),
        plugins: Object.values(this.app.babel.plugins),
        env: this.env,
        root: this.root,
      })),
    )

    this.app.build.rules.js.setUse(items => [`babel`, ...items])
  }
}
