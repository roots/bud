import type * as Webpack from 'webpack'

import type {Framework, Service} from './'

/**
 * {@link Service}: Generates {@link Webpack.Configuration} from {@link Framework.Rules}
 *
 * @remarks
 * The most current {@link Webpack.Configuration} is accessible through {@link Build.config}. If {@link Build.Config}
 * has never been built before, accessing the property will automatically build it.
 *
 * If the configuration has changed {@link Build.rebuild} can be called to regenerate the configuration.
 *
 * Most configuration values are produced using {@link Framework.Hooks} callbacks. They are keyed with strings starting `build/`.
 * So, you could access the {@link Webpack.Configuration['entry']} with `bud.hooks.filter('build/entry')`
 *
 * For typescript users who wish to maintain typing accuracy while adding support for
 * various loaders, items and rules:
 *
 * - {@link Build.loaders} should be declared by augmenting the {@link Framework.Loaders} interface
 * - {@link Build.items} should be declared by augmenting the {@link Framework.Items} interface
 * - {@link Build.rules} should be declared by augmenting the {@link Framework.Rules} interface
 *
 * @example
 * Access the config
 *
 * ```js
 * build.config
 * ```
 *
 * @example
 * Rebuild the configuration
 *
 * ```js
 * build.rebuild()
 * ```
 *
 * @example
 * Filter the Webpack configuration.entry value
 *
 * ```js
 * bud.hooks.filter('build/entry')
 * ```
 *
 * @noInheritDoc
 */
interface Build extends Service {
  /**
   * {@link Framework.Loaders} registry
   */
  loaders: Framework.Loaders

  /**
   * RuleSetUse item registry
   */
  items: Framework.Items

  /**
   * Webpack rules registry
   */
  rules: Framework.Rules

  /**
   * Accesses {@link Webpack.Configuration}
   */
  config: Webpack.Configuration

  /**
   * Regenerate {@link Webpack.Configuration}
   */
  rebuild(): Webpack.Configuration
}

namespace Build {
  /**
   * Makes a Webpack loader
   */
  export interface Loader {
    /**
     * Returns {@link Loader.Output}
     */
    make(app: Framework): string
  }

  /**
   * Makes a {@link Webpack.RuleSetRule.use} item
   */
  export interface Item {
    /**
     * Set the {@link Loader}
     */
    setLoader(loader: (app?: Framework) => Build.Loader): void

    /**
     * Set the {@link Build.Item.OptionsFn}
     */
    setOptions(options: Build.Item.OptionsFn): void

    /**
     * Merge {@link Build.Item.Options} with existing options
     */
    mergeOptions(
      options: Build.Item.Options,
      app: Framework,
    ): void

    /**
     * Makes the {@link Webpack.RuleSetRule.use} item
     */
    make(app: Framework): Build.Item.Output
  }

  /**
   * Makes a {@link RuleSetRule}
   */
  export interface Rule {
    /**
     * Wrapping {@link Webpack.RuleSetRule.test}
     */
    test?: (app?: Framework) => Webpack.RuleSetRule['test']

    /**
     * Returns an array of {@link Build.Item} values
     *
     * @remarks
     * each of the returned values is to be built with {@link Build.Item.make}
     * to produce {@link Webpack.RuleSetRule.use} compatible output.
     */
    use?: (app?: Framework) => Item[]

    /**
     * Get the value of `test`
     */
    getTest(app: Framework): RegExp

    /**
     * Set the value of `test`
     */
    setTest(test: RegExp | Rule.TestFn): void

    /**
     * Get the value of `use`
     */
    getUse(app: Framework): Item[]

    /**
     * Set the value of `use`
     */
    setUse(use: Rule.UseFn): void

    /**
     * Get the value of `exclude`
     */
    getExclude(app: Framework): Rule.Output['exclude']

    /**
     * Set the value of `exclude`
     */
    setExclude(exclude: Rule.ExcludeFn | RegExp): void

    /**
     * Get the value of `type`
     */
    getType(app: Framework): Rule.Output['type']

    /**
     * Set the value of `type`
     */
    setType(type: string | Rule.TypeFn): void

    /**
     * Get the value of `parser`
     */
    getParser(app: Framework): Rule.Parser

    /**
     * Set the value of `parser`
     */
    setParser(parser: Rule.Parser | Rule.ParserFn): void

    /**
     * Get the value of `generator`
     */
    getGenerator(app: Framework): any

    /**
     * Set the value of `generator`
     */
    setGenerator(Generator: any | Rule.GeneratorFn): void

    /**
     * Returns final {@link RuleSetRule} for inclusion in {@link Build.config}
     */
    make(app: Framework): Rule.Output | Webpack.RuleSetRule
  }

  export namespace Item {
    export type LoaderFn = (app?: Framework) => Loader
    export type OptionsFn = (app?: Framework) => Options
    export type Options = {[key: string]: any}

    export interface ConstructorOptions {
      loader: Loader | LoaderFn
      options?: OptionsFn | Options
    }

    export interface Output {
      loader: Build.Loader.Output
      options?: {[key: string]: any}
    }
  }

  export namespace Loader {
    export type Output = string
    export type Src = (app?: Framework) => Output
    export type Input = Src | Output
  }

  export namespace Rule {
    export type TestFn = (app?: Framework) => RegExp
    export type UseFn = (app?: Framework) => Item[]
    export type ExcludeFn = (app?: Framework) => RegExp
    export type TypeFn = (app?: Framework) => string

    export interface Parser {
      parse: (input?: string) => any
    }
    export type ParserFn = (app?: Framework) => Parser

    export type GeneratorFn = (app?: Framework) => any

    export interface Options {
      test: RegExp | TestFn
      use?: Item[] | UseFn
      exclude?: RegExp | ExcludeFn
      type?: string | TypeFn
      parser?: ParserFn | Parser
      generator?: GeneratorFn | any
    }

    /**
     * Output conforming to Webpack {@link RuleSetRule} interface
     */
    export interface Output {
      test: RegExp
      use?: {
        loader: string
        options?: {[key: string]: any}
      }[]
      exclude?: RegExp
      type?: string
      parser?: Parser
      generator?: any
    }
  }
}

export {Build}
