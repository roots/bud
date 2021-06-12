import {Framework} from '../Framework'
import {Service} from '../Service'
import {Module} from '../Extensions/Module'
import Webpack from 'webpack/types'

export {Hooks}

/**
 * Hooks
 *
 * [🏡 web](https://roots.io/bud)
 * [🐙 git](https://www.github.com/tree/stable/packages/@roots/bud-hooks)
 * [📦 npm](https://www.npmjs.com/package/@roots/bud-hooks)
 *
 * ### Usage
 *
 * ####  Add a new entry to the
 * `webpack.externals` configuration:
 *
 * ```js
 * hooks.on(
 *   'build/externals',
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
 *   'build/output/filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 */
interface Hooks extends Service {
  /**
   * Hooks repository
   */
  repository: Hooks.Repository

  /**
   * ## hooks.on
   *
   * Register a function to filter a value.
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
   * app.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   */
  on(id: Hooks.Name, callback: Hooks.Hook): Framework

  /**
   * ## hooks.filter
   *
   * The other side of bud.hooks.on. Passes a key and a value. If
   * any filters are registered on that key they will transform
   * the output before it is returned.
   *
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   */
  filter<T = any>(id: `${Hooks.Name & string}`): T

  /**
   * ## hooks.link
   *
   * Link one key to the value of another
   */
  link(
    target: `${Hooks.Name & string}`,
    links: string[],
  ): Framework
}

namespace Hooks {
  export type LinkedObj<T> = {
    [K in keyof T as `${K & string}`]: `${Hooks.Name & string}`
  }

  /**
   * Hook definition
   */
  export type Hook<T = any> = ((value?: T) => T) | T

  /**
   * bud.publish key/value argument
   */
  export type PublishDict = {
    [K in Hooks.Name as `${K & string}`]?: any
  }

  /**
   * Loaders
   */
  export namespace Loader {
    export type Base = `loader`
    export type Subject = string

    export interface Definitions {
      css: Subject
      raw: Subject
      style: Subject
      file: Subject
      url: Subject
      minicss: Subject
      ['resolve-url']: Subject
    }

    export type Final =
      | `loader`
      | keyof {
          [K in keyof Definitions as `${Base}/${K &
            string}`]: Definitions[K]
        }
  }

  export namespace Item {
    export type Base = 'item'
    export type Subject = Webpack.RuleSetUseItem
    export type SubjectKeys = 'loader' | 'options'

    export type OptionsKey = `${string}`

    export interface Definitions {
      css: Subject
      file: Subject
      image: Subject
      font: Subject
      js: Subject
      minicss: Subject
      'resolve-url': Subject
      raw: Subject
      style: Subject
      svg: Subject
    }

    export type Root = {
      item: Subject
    }

    export type Item = {
      [K in keyof Definitions as `${Base}/${K & string}`]: any
    }

    export type Props = {
      [K in keyof Item as `${K & string}/${SubjectKeys}`]: any
    }

    export type OptionKey<K> = `${K & string}/${SubjectKeys &
      'options'}/${string}`

    export type Options = {
      [K in keyof Item as OptionKey<K>]: any
    }

    export type Final =
      | keyof Root
      | keyof Item
      | keyof Props
      | keyof Options
  }

  export namespace Rule {
    export type Base = 'rule'
    export type Subject = Webpack.RuleSetRule
    export type WebpackMap = {
      [K in keyof Subject as `${Base}/${keyof Definitions &
        string}/${K & string}`]: Subject[K]
    }

    export interface Definitions {
      js: Subject
      css: Subject
      html: Subject
      svg: Subject
      image: Subject
      font: Subject
      xml: Subject
      json5: Subject
      csv: Subject
      yml: Subject
      toml: Subject
    }

    export type Root = {
      rule: Subject
    }

    export type Rule = {
      [K in keyof Definitions as `${Base}/${K & string}`]: any
    }

    export type Props = {
      [K in keyof Rule as `${K & string}/${keyof Subject &
        string}`]: any
    }

    export type Options = {
      [K in keyof Rule as `${K & string}/${keyof Subject &
        'options'}/${string}`]: any
    }

    export type Final =
      | keyof Root
      | keyof Rule
      | keyof Props
      | keyof Options
  }

  export namespace Build {
    /**
     * Bud does not support 'none'
     */
    export type Mode = 'development' | 'production'

    export type Rules = Webpack.Configuration['module']['rules']
    export interface RulesOverride extends Rules {
      oneOf: Webpack.RuleSetRule
    }

    export type Optimization =
      Webpack.Configuration['optimization']
    export interface OptimizationOverride extends Optimization {
      splitChunks: {
        cacheGroups: any
      }
    }

    interface Config extends Webpack.Configuration {
      mode?: Build.Mode
      module?: {
        noParse?:
          | RegExp
          | RegExp[]
          | ((content: string) => boolean)
        parser: any
        rules?: RulesOverride
      }
      optimization?: OptimizationOverride
      parallelism?: Webpack.Configuration['parallelism']
    }

    export type Dive<T, S> = {
      [K in keyof T as `build/${S & string}/${K & string}`]: T[K]
    }

    export type Props = {
      [K in keyof Config as `build/${K & string}`]: Config[K]
    }

    export type Top = {build: Config}

    export type Final = keyof {
      [K in
        | keyof Top
        | keyof Props
        | keyof Dive<Config['output'], 'output'>
        | 'build/output/pathInfo'
        | keyof Dive<Config['module'], 'module'>
        | keyof Dive<Config['module']['rules'], 'module/rules'>
        | keyof Dive<
            Config['module']['rules']['oneOf'],
            'module/rules/oneOf'
          >
        | 'build/module/rules/parser'
        | keyof Dive<Config['resolve'], 'resolve'>
        | keyof Dive<Config['resolveLoader'], 'resolveLoader'>
        | 'build/cache/name'
        | 'build/cache/cacheLocation'
        | 'build/cache/cacheDirectory'
        | 'build/cache/hashAlgorithm'
        | 'build/cache/managedPaths'
        | 'build/cache/version'
        | 'build/cache/type'
        | 'build/cache/buildDependencies'
        | keyof Dive<Config['experiments'], 'experiments'>
        | keyof Dive<Config['watchOptions'], 'watchOptions'>
        | keyof Dive<Config['performance'], 'performance'>
        | keyof Dive<Config['optimization'], 'optimization'>
        | keyof Dive<
            Config['optimization']['splitChunks'],
            'optimization/splitChunks'
          >
        | keyof Dive<
            Config['optimization']['splitChunks']['cacheGroups'],
            'optimization/splitChunks/cacheGroups'
          >
        | keyof Dive<
            Config['optimization']['splitChunks']['cacheGroups']['vendor'],
            'optimization/splitChunks/cacheGroups/vendor'
          >]: any
    }
  }

  export namespace Locale {
    export interface Definitions {
      project: Subject
      src: Subject
      dist: Subject
      publicPath: Subject
      storage: Subject
      modules: Subject
      records: Subject
    }

    export type Base = `location`
    export type Subject = string
    export type Final = keyof {
      [K in keyof Definitions as `${Base}/${K &
        string}`]: Definitions[K]
    }
  }

  export namespace Extension {
    export type Base = `extension`
    export type Subject = Module

    export type Final = keyof {
      [K in keyof Framework.Extensions as
        | `extension`
        | `extension/${K}`
        | `extension/${K}/${
            | `${keyof Subject & string}`
            | `${keyof Subject & string}/${string}`}`]: any
    }
  }

  export type Name =
    | `before`
    | `after`
    | `${Item.Final}`
    | `${Locale.Final}`
    | `${Loader.Final}`
    | `${Rule.Final}`
    | `${Extension.Final}`
    | `${Build.Final}`

  export type Repository = {
    [K in Name as `${K & string}`]?: Hook[]
  }
}
