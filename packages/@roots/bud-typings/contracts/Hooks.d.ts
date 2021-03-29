import {Build, Module, Framework, Service, Loader} from '.'
import {Webpack} from '../../bud-support/src'
import {Configuration} from 'webpack'

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
    [K in Hooks.Name as `${K}`]?: Hook
  }

  /**
   * Loaders
   */
  namespace Loader {
    type BaseKey = `loader`
    type Subject = string

    interface Base {
      css: Subject
      raw: Subject
      style: Subject
      file: Subject
      cache: Subject
      url: Subject
      minicss: Subject
      ['resolve-url']: Subject
      thread: Subject
    }

    type Key = {
      [K in keyof Base as `${BaseKey}/${K}`]: Subject
    }
  }

  /**
   * Items
   */
  namespace Item {
    type BaseKey = `item`
    type Subject = Webpack.RuleSetLoader

    interface Base {
      cache: Subject
      css: Subject
      file: Subject
      js: Subject
      minicss: Subject
      [`resolve-url`]: Subject
      raw: Subject
      style: Subject
      svg: Subject
      thread: Subject
    }

    type Key = {
      [K in keyof Base as `${BaseKey}/${K}`]: Base[K]
    }

    type Property = {
      [K in keyof Subject as `${keyof Key}/${K}`]: Base[K]
    }

    type ExtendedKeys = `${keyof Property}/${string}`
  }

  /**
   * Rules
   */
  namespace Rule {
    type BaseKey = `rule`
    type Subject = Webpack.RuleSetRule

    interface Base {
      js: Subject
      css: Subject
      html: Subject
      svg: Subject
      image: Subject
      font: Subject
    }

    type Key = {
      [K in keyof Base as `${BaseKey}/${K}`]: Subject
    }

    type Property = {
      [K in keyof Subject as `${keyof Key}/${K}`]: Subject[K]
    }
  }

  /**
   * Build
   */
  namespace Build {
    type BaseKey = `build`
    type Subject = Webpack.Configuration

    type Value = {
      [K in keyof Subject as `${K}`]: Webpack.Configuration[K]
    }

    type Key = {
      [K in keyof Subject as `${BaseKey}/${K}`]: Value[K]
    }

    namespace Keys {
      type Base = 'build'
      type Config = `${Base}/${keyof Subject}`
      type Extended = `${Base}/${keyof Subject}/${keyof Value}`
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

    type Value = {
      [K in Base]: Base[K]
    }

    type Key = {
      [K in keyof Base as `${BaseKey}/${K}`]: Value[K]
    }
  }

  namespace Extension {
    type BaseKey = `extension`
    type Subject = Module

    namespace Keys {
      type Extension = `${BaseKey}/${string}`
      type Options = `${Extension}/options`
      type Extended = `${Options}/${string}`
    }
  }

  type Name =
    | keyof Locale.Key
    | Loader.BaseKey
    | keyof Loader.Key
    | Rule.BaseKey
    | keyof Rule.Key
    | keyof Rule.Property
    | Item.BaseKey
    | keyof Item.Key
    | keyof Item.Property
    | Item.ExtendedKeys
    | Build.Keys.Base
    | Build.Keys.Config
    | Build.Keys.Extended
    | keyof Build.Key
    | Extension.Keys.Base
    | Extension.Keys.Extension
    | Extension.Keys.Options
    | Extension.Keys.Extended

  interface Repository {
    [key: Name]: Hook[]
  }
}
