import {Module, Service} from './'
import Webpack from 'webpack'

{
  Hooks
}

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

declare interface Hooks extends Service {
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

declare namespace Hooks {
  /**
   * Hook definition
   */
  type Hook<T = any> = (value?: T) => T

  /**
   * bud.publish key/value argument
   */
  type PublishDict = {
    [K in Hooks.Name as `${K & string}`]?: any
  }

  /**
   * Loaders
   */
  namespace Loader {
    type Base = `loader`
    type Subject = string

    interface Definitions {
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

    type Final =
      | `loader`
      | keyof {
          [K in keyof Definitions as `${Base}/${K &
            string}`]: Definitions[K]
        }
  }

  /**
   * Items
   */
  namespace Item {
    type Base = 'item'
    type Subject = Webpack.RuleSetLoader
    type SubjectKeys = 'loader' | 'options'

    type OptionsKey = `${string}`

    interface Definitions {
      cache: Subject
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
      thread: Subject
    }

    type Root = {
      item: Subject
    }

    type Item = {
      [K in keyof Definitions as `${Base}/${K & string}`]: any
    }

    type Props = {
      [K in keyof Item as `${K & string}/${SubjectKeys}`]: any
    }

    type OptionKey<K> = `${K & string}/${SubjectKeys &
      'options'}/${string}`

    type Options = {
      [K in keyof Item as OptionKey<K>]: any
    }

    type Final =
      | keyof Root
      | keyof Item
      | keyof Props
      | keyof Options
  }

  /**
   * Rules
   */
  namespace Rule {
    type Base = 'rule'
    type Subject = Webpack.RuleSetRule
    type WebpackMap = {
      [K in keyof Subject as `${Base}/${keyof Definitions &
        string}/${K & string}`]: Subject[K]
    }

    interface Definitions {
      js: Subject
      css: Subject
      html: Subject
      svg: Subject
      image: Subject
      font: Subject
    }

    type Root = {
      rule: Subject
    }

    type Rule = {
      [K in keyof Definitions as `${Base}/${K & string}`]: any
    }

    type Props = {
      [K in keyof Rule as `${K & string}/${keyof Subject &
        string}`]: any
    }

    type Options = {
      [K in keyof Rule as `${K & string}/${keyof Subject &
        'options'}/${string}`]: any
    }

    type Final =
      | keyof Root
      | keyof Rule
      | keyof Props
      | keyof Options
  }

  /**
   * Build
   */
  namespace Build {
    /**
     * Extended Cache definition
     */
    interface Cache extends Webpack.Cache {
      name?: string
      location?: string
      directory?: string
      buildDependencies?: string
    }

    /**
     * Extended optimization definition
     */
    interface Optimization extends Webpack.Options.Optimization {
      splitChunks?: {
        cacheGroups?: Webpack.Options.CacheGroupsOptions & {
          vendor?: Webpack.Options.CacheGroupsOptions
        }
      }
    }

    /**
     * Bud does not support 'none'
     */
    type Mode = 'development' | 'production'

    /**
     * Override rules definition (since we skip the arrayed
     * ruleset for ease of access)
     */
    interface Module extends Webpack.Module {
      noParse?:
        | RegExp
        | RegExp[]
        | ((content: string) => boolean)
      unknownContextRequest?: string
      unknownContextRecursive?: boolean
      unknownContextRegExp?: RegExp
      unknownContextCritical?: boolean
      exprContextRequest?: string
      exprContextRegExp?: RegExp
      exprContextRecursive?: boolean
      exprContextCritical?: boolean
      wrappedContextRegExp?: RegExp
      wrappedContextRecursive?: boolean
      wrappedContextCritical?: boolean
      strictExportPresence?: boolean
      rules: Webpack.RuleSetRule
    }

    interface Config extends Webpack.Config {
      mode?: Build.Mode
      module?: Build.Module
      cache?: Build.Cache
      optimization?: Build.Optimization
      name?: string
      context?: string
      entry?: string | string[] | Webpack.Entry
      devtool?: Webpack.Options.Devtool
      output?: Webpack.Output
      resolve?: Webpack.Resolve
      resolveLoader?: Webpack.ResolveLoader
      externals?:
        | Webpack.ExternalsElement
        | Webpack.ExternalsElement[]
      target?:
        | 'web'
        | 'webworker'
        | 'node'
        | 'async-node'
        | 'node-webkit'
        | 'atom'
        | 'electron'
        | 'electron-renderer'
        | 'electron-preload'
        | 'electron-main'
        | ((compiler?: any) => void)
      bail?: boolean
      profile?: boolean
      watch?: boolean
      watchOptions?: Webpack.Options.WatchOptions
      node?: Webpack.Node | false
      amd?: {[moduleName: string]: boolean}
      recordsPath?: string
      recordsInputPath?: string
      recordsOutputPath?: string
      plugins?: Webpack.Plugin[]
      stats?: Webpack.Options.Stats
      performance?: Webpack.Options.Performance | false
      parallelism?: number
    }

    type Dive<T, S> = {
      [K in keyof T as `build/${S & string}/${K & string}`]: T[K]
    }

    type Props = {
      [K in keyof Config as `build/${K & string}`]: Config[K]
    }

    type Top = {build: Config}

    type Final = keyof {
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

  namespace Locale {
    interface Definitions {
      project: Subject
      src: Subject
      dist: Subject
      publicPath: Subject
      storage: Subject
      modules: Subject
      records: Subject
    }

    type Base = `location`
    type Subject = string
    type Final = keyof {
      [K in keyof Definitions as `${Base}/${K &
        string}`]: Definitions[K]
    }
  }

  namespace Extension {
    type Base = `extension`
    type Subject = Module

    interface Definitions {
      'clean-webpack-plugin': Subject
      'webpack-config-dump-plugin': Subject
      'webpack-copy-plugin': Subject
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
      'write-file-webpack-plugin': Subject
    }

    type Final = keyof {
      [K in keyof Definitions as
        | `extension`
        | `extension/${K}`
        | `extension/${K}/${
            | `${keyof Subject & string}`
            | `${keyof Subject & string}/${string}`}`]: any
    }
  }

  type Name =
    | `${Item.Final}`
    | `${Locale.Final}`
    | `${Loader.Final}`
    | `${Rule.Final}`
    | `${Extension.Final}`
    | `${Build.Final}`

  type Repository = {
    [K in Name as `${K & string}`]?: Hook[]
  }
}
