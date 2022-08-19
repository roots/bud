import type {Build} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

import {Config} from './config.js'

/**
 * Babel support for `@roots/bud`
 *
 * @public
 */
@label(`@roots/bud-babel`)
export default class BabelExtension extends Extension<any, null> {
  /**
   * Babel cache directory
   *
   * @public
   */
  public get cacheDirectory() {
    return this.app.path(`@storage`, this.app.label, `cache`, `babel`)
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
   * Initialize extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async init() {
    this.app.babel = new Config()
    process.env.BABEL_ENV = this.app.mode
  }

  /**
   * Register extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    const presetEnv = await this.resolve(
      `@babel/preset-env`,
      import.meta.url,
    )
    if (presetEnv) this.app.babel.setPreset(`@babel/preset-env`, presetEnv)

    const transformRuntime = await this.resolve(
      `@babel/plugin-transform-runtime`,
      import.meta.url,
    )
    transformRuntime &&
      this.app.babel.setPlugin(`@babel/plugin-transform-runtime`, [
        transformRuntime,
        {helpers: false},
      ])

    const objectRestSpread = await this.resolve(
      `@babel/plugin-proposal-object-rest-spread`,
      import.meta.url,
    )
    objectRestSpread &&
      this.app.babel.setPlugin(
        `@babel/plugin-proposal-object-rest-spread`,
        objectRestSpread,
      )

    const classProperties = await this.resolve(
      `@babel/plugin-proposal-class-properties`,
      import.meta.url,
    )
    classProperties &&
      this.app.babel.setPlugin(
        `@babel/plugin-proposal-class-properties`,
        classProperties,
      )

    const dynamicImport = await this.resolve(
      `@babel/plugin-syntax-dynamic-import`,
      import.meta.url,
    )
    dynamicImport &&
      this.app.babel.setPlugin(
        `@babel/plugin-syntax-dynamic-import`,
        dynamicImport,
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
