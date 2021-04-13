import {Module, Service} from './'
import Webpack from 'webpack'

/**
 * ## hooks
 *
 * Bud provides a system of 'hooks' to
 * expose deeply nested values for easy
 * and (hopefully) safe modification
 *
 * [🏡 Project home](https://roots.io/bud)
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

export interface Hooks extends Service {
  /**
   * Hooks repository
   */
  repository: Hooks.Repository

  /**
   * ## hooks.on
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
  export type Hook<T = any> = (value?: T) => T

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

  /**
   * Items
   */
  export namespace Item {
    export type Base = 'item'
    export type Subject = Webpack.RuleSetLoader
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

  /**
   * Rules
   */
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

  /**
   * Build
   */
  export namespace Build {
    /**
     * Bud does not support 'none'
     */
    export type Mode = 'development' | 'production'

    /**
     * Override rules definition (since we skip the arrayed
     * ruleset for ease of access)
     */
    export interface Module extends Webpack.Module {
      noParse?:
        | RegExp
        | RegExp[]
        | ((content: string) => boolean)
      rules: Webpack.RuleSetRule
    }

    export interface Config extends Webpack.Config {
      mode?: Build.Mode
      module?: Build.Module
      optimization?: Build.Optimization
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
        | keyof Dive<Config['module'], 'module'>
        | keyof Dive<Config['module']['rules'], 'module/rules'>
        | keyof Dive<
            Config['module']['rules']['oneOf'],
            'module/rules/oneOf'
          >
        | keyof Dive<Config['resolve'], 'resolve'>
        | keyof Dive<Config['resolveLoader'], 'resolveLoader'>
        | keyof Dive<Config['cache'], 'cache'>
        | keyof Dive<Config['watchOptions'], 'watchOptions'>
        | keyof Dive<Config['performance'], 'performance'>
        /**
         * Optimization
         */
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

    export interface Definitions {
      'clean-webpack-plugin': Subject
      'webpack-config-dump-plugin': Subject
      'webpack-define-plugin': Subject
      'hashed-module-ids-plugin': Subject
      'webpack-hot-module-replacement-plugin': Subject
      'html-webpack-plugin': Subject
      'html-hard-disk-plugin': Subject
      'interpolate-html-plugin': Subject
      'ignore-emit-webpack-plugin': Subject
      'webpack-manifest-plugin': Subject
      'mini-css-extract-plugin': Subject
      'optimize-css-assets-webpack-plugin': Subject
      'webpack-provide-plugin': Subject
    }

    export type Final = keyof {
      [K in keyof Definitions as
        | `extension`
        | `extension/${K}`
        | `extension/${K}/${
            | `${keyof Subject & string}`
            | `${keyof Subject & string}/${string}`}`]: any
    }
  }

  export type Name =
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
