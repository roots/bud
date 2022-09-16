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
    this.app.babel = new Config()

    const presetEnv = await this.resolve(`@babel/preset-env`)
    if (presetEnv) this.app.babel.setPreset(`@babel/preset-env`, presetEnv)

    const transformRuntime = await this.resolve(
      `@babel/plugin-transform-runtime`,
    )
    transformRuntime &&
      this.app.babel.setPlugin(`@babel/plugin-transform-runtime`, [
        transformRuntime,
        {helpers: false},
      ])

    const objectRestSpread = await this.resolve(
      `@babel/plugin-proposal-object-rest-spread`,
    )
    objectRestSpread &&
      this.app.babel.setPlugin(
        `@babel/plugin-proposal-object-rest-spread`,
        objectRestSpread,
      )

    const classProperties = await this.resolve(
      `@babel/plugin-proposal-class-properties`,
    )
    classProperties &&
      this.app.babel.setPlugin(
        `@babel/plugin-proposal-class-properties`,
        classProperties,
      )

    const dynamicImport = await this.resolve(
      `@babel/plugin-syntax-dynamic-import`,
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

    this.app.build.setLoader(`babel`, loader).setItem(`babel`, {
      loader: `babel`,
      options: () => ({
        cacheDirectory: this.cacheDirectory,
        presets: Object.values(this.app.babel.presets),
        plugins: Object.values(this.app.babel.plugins),
        env: this.env,
        root: this.root,
      }),
    })

    this.app.build.rules.js.setUse(items => [
      this.app.build.items.babel,
      ...(items ?? []),
    ])
  }
}
