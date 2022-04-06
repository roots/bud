import {lodash} from '@roots/bud-support'

import {Locations} from './'
import {Bud} from './bud'
import {ConfigMap} from './config/map'
import {ContainerService} from './service'

const {get, set} = lodash

/**
 * Container store for initial configuration and general options
 *
 * @public
 */
export class Store<T = Store.Repository> extends ContainerService<T> {
  /**
   * Get a store value
   *
   * @override
   */
  public get<K extends keyof Store.Map & string, T = Store.Map[K]>(
    path: K,
  ): T {
    return get(this.repository, path)
  }

  /**
   * Set a store value
   *
   * @override
   */
  public set<K extends keyof Store.Map & string, T = Store.Map[K]>(
    path: K,
    value: T,
  ) {
    set(this.repository, path, value)
    return this
  }
}

export type BudCallable<T> = (app: Bud) => T

export type CompilerConfigCallables = {
  [K in keyof ConfigMap as `${K & string}`]: BudCallable<
    ConfigMap[K]
  >
}

export namespace Store {
  /**
   * Bud base configuration
   *
   * @remarks
   * These are just initial values. They can be overwritten by the user, or extended by the Bud/modules.
   * It is recommended to use {@link @roots/bud-Bud#Hooks.on} to extend the
   *
   * @public
   */
  export interface Repository extends CompilerConfigCallables {
    /**
     * Application name
     *
     * @public
     */
    name: string

    /**
     * Is caching enabled?
     *
     * @public
     */
    ['features.cache']?: boolean

    /**
     * Feature toggle: Clean dist before compilation
     *
     * When enabled stale assets will be removed from
     * the `@dist` directory prior to the next
     * compilation.
     *
     * @defaultValue true
     *
     * @public
     */
    ['features.clean']?: boolean

    /**
     * Enable or disable filename hashing
     *
     * @defaultValue false
     *
     * @public
     */
    ['features.hash']?: boolean

    /**
     * Emit html template
     *
     * @defaultValue true
     *
     * @public
     */
    ['features.html']?: boolean

    /**
     * Automatically inject installed extensions
     *
     * @public
     */
    ['features.inject']?: boolean

    /**
     * Log to console
     *
     * @defaultValue false
     *
     * @public
     */
    ['features.log']?: boolean

    /**
     * Enable or disable producing a manifest.json file
     *
     * @defaultValue true
     *
     * @public
     */
    ['features.manifest']?: boolean

    /**
     * Enable or disable proxy
     */
    ['features.proxy']?: boolean

    /**
     * Enable or disable runtime chunk
     *
     * @public
     */
    ['features.runtimeChunk']?: boolean

    /**
     * Enable or disable chunk splitting (vendor)
     *
     * @defaultValue false
     *
     * @public
     */
    ['features.splitChunks']?: boolean

    /**
     * Shared regular expressions for pattern matching.
     *
     * @example
     * ```js
     * app.patterns.get('js')
     * ```
     *
     * @public
     */
    patterns: Record<string, RegExp>

    /**
     * Registered fs directories
     *
     * @public
     */
    location: Partial<Locations> & {
      '@src': string
      '@dist': string
      '@modules': string
      '@storage': string
    }

    /**
     * File format (when hashing is disabled)
     *
     * @remarks
     * do not include extension
     *
     * @defaultValue '[name]'
     *
     * @public
     */
    fileFormat: string
    /**
     * File format when hashing is enabled
     *
     * @remarks
     * do not include extension
     *
     * @defaultValue '[name].[contenthash:6]'
     *
     * @public
     */
    hashFormat: string
  }

  export interface Map
    extends RepositoryKeyMap,
      LocationKeyMap,
      PatternKeyMap,
      CompilerConfigCallables {}

  type RepositoryKeyMap = {
    [K in keyof Repository as `${K & string}`]: Repository[K]
  }

  type LocationKeyMap = {
    [K in keyof Repository['location'] as `location.${K &
      string}`]: Repository['location'][K]
  }

  type PatternKeys =
    | 'js'
    | 'css'
    | 'font'
    | 'image'
    | 'modules'
    | 'html'
    | 'ts'
    | 'sass'
    | 'cssModule'
    | 'sassModule'
    | 'svg'
    | 'vue'
    | 'md'
    | 'json'
    | 'json5'
    | 'toml'
    | 'yml'
    | 'xml'
    | 'csv'
    | 'webp'

  type PatternKeyMap = {
    [K in PatternKeys as `patterns.${K &
      string}`]: Repository['patterns'][K]
  }
}
