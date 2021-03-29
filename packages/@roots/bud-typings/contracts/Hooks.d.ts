import {Build, Module, Framework, Service, Loader} from '.'
import 'webpack'

declare namespace Webpack.Configuration {
  interface RuleSetLoader {
    [key: `cache/location`]: any
    [key: `cache/name`]: any
    [key: `watchOptions/${string}`]: any
  }
}

/**
 * ## hooks
 *
 * Bud provides a system of 'hooks' to expose values
 * for easier modification.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-hooks)
 * [🔗 Documentation](#)
 *
 * ### Usage
 *
 * ####  Add a new entry to the `webpack.externals` configuration:
 *
 * ```js
 * hooks.on(
 *   'webpack.externals',
 *   externals => ({
 *     ...externals,
 *     $: 'jquery',
 *   }),
 * )
 * ```
 *
 * #### Change the `webpack.output.filename` format:
 *
 * ```js
 * hooks.on(
 *   'webpack.output.filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 *
 * #### Replace the regular expression used for CSS modules:
 *
 * ```js
 * hooks.on(
 *   'webpack.module.rules.oneOf.css.test',
 *   () => /\.css$/,
 * )
 * ```
 */
export interface Hooks extends Service {
  /**
   * Hooks repository
   */
  repository: Hooks.Repository

  /**
   * ## hooks.on
   *
   * If a filter calls for this name the function is then run,
   * passing whatever data along for modification. If more than one
   * hook is registered to a name, they will be called sequentially
   * in the order they were registered, with each hook's output used
   * as the input for the next.
   *
   * ### Usage
   *
   * ```js
   * hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   */
  on(
    id: `${Hooks.Name}` | [string, `${Hooks.Name}`],
    callback: Hooks.Hook,
  ): Framework

  /**
   * ## hooks.filter
   *
   * Make a value filterable by hooks.
   *
   * Provide the name of the hook and the initial value. If any
   * `bud.hooks.on` functions are "hooked" to the provided name, the
   * value will be passed through them before being returned to your
   * calling code.
   *
   * ### Usage
   *
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   */
  filter<T = any>(
    id: `${Hooks.Name}` | [string, `${Hooks.Name}`],
  ): T
}

export namespace Hooks {
  /**
   * Hook definition
   */
  type Hook<T = any> = (value?: T) => T

  /**
   * bud.publish key/value argument
   */
  type PublishDict = {
    [K in Hooks.Name]?: any
  }

  /**
   * Loaders
   */
  namespace Loader {
    type BaseKey = `loader`
    type Subject = string

    interface Base {
      css: any
      raw: any
      style: any
      file: any
      cache: any
      url: any
      minicss: any
      ['resolve-url']: any
      thread: any
    }

    type Key = {
      [K in keyof Base as `${BaseKey}/${K}`]: any
    }
  }

  /**
   * Items
   */
  namespace Item {
    type BaseKey = `item`
    type Subject = Webpack.RuleSetLoader

    interface Base {
      cache: any
      css: any
      file: any
      js: any
      minicss: any
      [`resolve-url`]: any
      raw: any
      style: any
      svg: any
      thread: any
    }

    type Key = {
      [K in keyof Base as
        | `item`
        | `item/${K}`
        | `item/${K}/loader`
        | `item/${K}/${string}`]: any
    }
  }

  /**
   * Rules
   */
  namespace Rule {
    type BaseKey = `rule`

    /**
     * Excluding loaders cos confusing to have plural and singular
     */
    type Subject = Exclude<keyof Webpack.RuleSetRule, 'loaders'>

    interface Base {
      js: any
      css: any
      html: any
      svg: any
      image: any
      font: any
    }

    type Key = {
      [K in keyof Base as
        | `${BaseKey}`
        | `${BaseKey}/${K}`
        | `${BaseKey}/${K}/${Subject}`
        | `${BaseKey}/${K}/${Subject}/${string}`]: any
    }
  }

  /**
   * Build
   */
  namespace Build {
    type Base = `build`

    type Key = {
      [K in keyof Webpack.Configuration as
        | `${Base}`
        | `${Base}/${K}`
        | `${Base}/${K}/${string}`]: any
    }
  }

  namespace Locale {
    type BaseKey = `location`

    type Subject = string

    interface Base {
      project: Subject
      src: Subject
      dist: Subject
      publicPath: Subject
      storage: Subject
      modules: Subject
      records: Subject
    }

    type Key = {
      [K in keyof Base as `${BaseKey}/${K}`]: any
    }
  }

  namespace Extension {
    type BaseKey = `extension`

    interface Base {
      'clean-webpack-plugin': any
      'webpack-config-dump-plugin': any
      'copy-webpack-plugin': any
      'define-webpack-plugin': any
      'hashed-module-ids-plugin': any
      'webpack-hot-module-replacement-plugin': any
      'html-webpack-plugin': any
      'html-hard-disk-plugin': any
      'interpolate-html-plugin': any
      'ignore-emit-webpack-plugin': any
      'webpack-manifest-plugin': any
      'mini-css-extract-plugin': any
      'optimize-css-assets-webpack-plugin': any
      'webpack-provide-plugin': any
      'write-file-webpack-plugin': any
    }

    type Key = {
      [K in keyof Base as
        | `${BaseKey}`
        | `${BaseKey}/${K}`
        | `${BaseKey}/${K}/${keyof Module}`
        | (string &
            `${BaseKey}/${K}/${keyof Module}/${string}`)]: any
    }
  }

  type Name =
    | keyof Locale.Key
    | keyof Loader.Key
    | keyof Rule.Key
    | keyof Item.Key
    | keyof Build.Key
    | keyof Extension.Key

  interface Repository {
    [key: Name]: Hook[]
  }
}
