import type * as Webpack from 'webpack'

import type {Framework, Module, Plugin, Service} from './'

/**
 * Service allowing for fitering {@link Framework} values through callbacks.
 *
 * @example
 * Add a new entry to the `webpack.externals` configuration:
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
 * @example
 * Change the `webpack.output.filename` format:
 *
 * ```js
 * hooks.on(
 *   'build/output/filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 */
interface Hooks extends Service<Hooks.Repository> {
  /**
   * hooks.on
   *
   * Register a function to filter a value.
   *
   * If a filter calls for this name the function is then run,
   * passing whatever data along for modification. If more than one
   * hook is registered to a name, they will be called sequentially
   * in the order they were registered, with each hook's output used
   * as the input for the next.
   *
   * ## Usage
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
   * hooks.filter
   *
   * The other side of bud.hooks.on. Passes a key and a value. If
   * any filters are registered on that key they will transform
   * the output before it is returned.
   *
   * ## Usage
   *
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   */
  filter<T = any>(id: Hooks.Name, seed?: any): T
}

namespace Hooks {
  /**
   * Hook definition
   */
  export type Hook<T = any> = ((value?: T) => T) | T

  /**
   * Hooks repository
   */
  export type Repository = {
    [K in Name as `${K & string}`]?: Hook[]
  }

  export type Key = `${keyof Repository}`

  export type LocationKeys =
    `location/${keyof Framework.Locations & string}`

  export type LoaderKeys =
    | `loader`
    | `loader/${keyof Framework.Loaders}`

  export type ItemKeys =
    | `item`
    | `item/${keyof Framework.Items}`
    | `item/${keyof Framework.Items}/loader`
    | `item/${keyof Framework.Items}/options`
    | `item/${keyof Framework.Items}/options/${string}`

  export type RuleKeys =
    | `rule`
    | `rule/${keyof Framework.Rules}`
    | `rule/${keyof Framework.Rules}/${keyof Webpack.RuleSetRule}`
    | `rule/${keyof Framework.Rules}/${keyof Webpack.RuleSetRule &
        `options`}/${string}`

  export namespace BuildHooks {
    type Rules = Webpack.Configuration['module']['rules']

    interface RulesOverride extends Rules {
      oneOf: Webpack.RuleSetRule
    }

    type Optimization = Webpack.Configuration['optimization']
    interface OptimizationOverride extends Optimization {
      splitChunks: {
        cacheGroups: any
      }
    }

    interface Config extends Webpack.Configuration {
      mode?: Framework.Mode
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

    type Dive<T, S> = {
      [K in keyof T as `build/${S & string}/${K & string}`]: T[K]
    }

    export type Keys =
      | `build`
      | `build/${keyof Config}`
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
        >
  }

  /**
   * Hooks.Extension
   */
  export namespace Extension {
    export type Keys = keyof {
      [K in keyof Framework.Extensions as
        | `extension`
        | `extension/${K}`
        | `extension/${K}/${
            | `${keyof Module & string}`
            | `${keyof Module & string}/${string}`}`]:
        | Module
        | Plugin
    }
  }

  /**
   * @hidden
   */
  export type Name =
    | `before`
    | `after`
    | `done`
    | `${ItemKeys}`
    | `${LocationKeys}`
    | `${LoaderKeys}`
    | `${RuleKeys}`
    | `${Extension.Keys}`
    | `${BuildHooks.Keys}`
}

export {Hooks}
