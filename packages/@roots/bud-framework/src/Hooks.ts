import * as Webpack from 'webpack'

import {
  Framework,
  Items,
  Loaders,
  Locations,
  Mode,
  Modules,
  Plugins,
  Rules,
  Service,
} from './'
import * as Extension from './Extensions/Extension'

/**
 * Service allowing for fitering {@link Framework} values through callbacks.
 *
 * @example
 * Add a new entry to the `webpack.externals` configuration:
 *
 * ```ts
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
 * ```ts
 * hooks.on(
 *   'build.output.filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 *
 * @public @core
 */
interface Hooks extends Service<Hooks.Repository> {
  /**
   * Register a function to filter a value.
   *
   * @remarks
   * If a filter calls for this name the function is then run,
   * passing whatever data along for modification. If more than one
   * hook is registered to a name, they will be called sequentially
   * in the order they were registered, with each hook's output used
   * as the input for the next.
   *
   * @example
   * ```js
   * app.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   */
  on(id: Hooks.Name, callback: Hooks.Hook): Framework

  /**
   * The other side of bud.hooks.on. Passes a key and a value. If
   * any filters are registered on that key they will transform
   * the output before it is returned.
   *
   * @example
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   */
  filter<T = any>(id: Hooks.Name, seed?: any): T
}

/**
 * Hooks namespace
 *
 * @public
 */
namespace Hooks {
  /**
   * Hook signature
   */
  export type Hook<T = any> = ((value?: T) => T) | T

  /**
   * Hooks repository
   *
   * @remarks
   * Mapped type for ensuring proper references throughout the application
   */
  export type Repository = {
    [K in Name as `${K & string}`]?: Hook[]
  }

  export type Key = `${keyof Repository}`

  export type LocationKeys = `location.${keyof Locations &
    string}`

  export type LoaderKeys =
    | `loader`
    | `loader/${keyof Loaders & string}`

  export type ItemKeys =
    | `item`
    | `item.${keyof Items & string}`
    | `item.${keyof Items & string}.loader`
    | `item.${keyof Items & string}.options`
    | `item.${keyof Items & string}.options.${string}`

  export type RuleKeys =
    | `rule`
    | `rule/${keyof Rules & string}`
    | `rule/${keyof Rules & string}.${keyof Webpack.RuleSetRule &
        string}`
    | `rule/${keyof Rules & string}.${keyof Webpack.RuleSetRule &
        `options` &
        string}.${string}`

  namespace BuildHooks {
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
      mode?: Mode
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
      [K in keyof T as `build/${S & string}.${K & string}`]: T[K]
    }

    export type Keys =
      | `build`
      | `build/${keyof Config}`
      | keyof Dive<Config['output'], 'output'>
      | 'build.output.pathInfo'
      | keyof Dive<Config['module'], 'module'>
      | keyof Dive<Config['module']['rules'], 'module.rules'>
      | keyof Dive<
          Config['module']['rules']['oneOf'],
          'module.rules.oneOf'
        >
      | 'build.module.rules.parser'
      | keyof Dive<Config['resolve'], 'resolve'>
      | keyof Dive<Config['resolveLoader'], 'resolveLoader'>
      | 'build.cache.name'
      | 'build.cache.cacheLocation'
      | 'build.cache.cacheDirectory'
      | 'build.cache.hashAlgorithm'
      | 'build.cache.managedPaths'
      | 'build.cache.version'
      | 'build.cache.type'
      | 'build.cache.buildDependencies'
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
  export type Keys = keyof {
    [K in (keyof Modules & string) | (keyof Plugins & string) as
      | `extension`
      | `extension.${K & string}`
      | `extension.${K}/${
          | `${
              | (keyof Modules & string)
              | (keyof Plugins & string)}`
          | (`${
              | (keyof Modules & string)
              | (keyof Plugins & string)}.${string}` &
              string)}`]: Extension.Module
  }

  /**
   * @internal
   */
  export type Name =
    | `before`
    | `after`
    | `done`
    | `${ItemKeys}`
    | `${LocationKeys}`
    | `${LoaderKeys}`
    | `${Keys}`
    | `${RuleKeys}`
    | `${BuildHooks.Keys}`
}

export {Hooks}
