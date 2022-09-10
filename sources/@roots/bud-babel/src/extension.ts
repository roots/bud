import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import type * as Build from '@roots/bud-framework/services/build'

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
    return ruleSetItem.setLoader(`babel`).setOptions(() => ({
      cacheDirectory: this.cacheDirectory,
      presets: Object.values(this.app.babel.presets),
      plugins: Object.values(this.app.babel.plugins),
      env: this.env,
      root: this.root,
    }))
  }

  /**
   * Register extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.babel = new Config()

    this.app.babel
      .setPreset(
        `@babel/preset-env`,
        await this.resolve(`@babel/preset-env`, import.meta.url),
      )

      .setPlugin(`@babel/plugin-transform-runtime`, [
        await this.resolve(
          `@babel/plugin-transform-runtime`,
          import.meta.url,
        ),
        {helpers: false},
      ])
      .setPlugin(
        `@babel/plugin-proposal-object-rest-spread`,
        await this.resolve(
          `@babel/plugin-proposal-object-rest-spread`,
          import.meta.url,
        ),
      )
      .setPlugin(
        `@babel/plugin-proposal-class-properties`,
        await this.resolve(
          `@babel/plugin-proposal-class-properties`,
          import.meta.url,
        ),
      )
      .setPlugin(
        `@babel/plugin-syntax-dynamic-import`,
        await this.resolve(
          `@babel/plugin-syntax-dynamic-import`,
          import.meta.url,
        ),
      )

    const loader = await this.resolve(`babel-loader`, import.meta.url)
    if (!loader) {
      return this.logger.error(`Babel loader not found`)
    }

    this.app.build
      .setLoader(`babel`, loader)
      .setItem(`babel`, this.setRuleSetItem)

    this.app.build.rules.js.setUse(items => [`babel`, ...items])
  }
}
