/**
 * @module @roots/bud-framework
 */

import type {Framework, Service} from './'
import type {Configuration, RuleSetRule} from 'webpack/types'

/**
 * @interface Build
 *
 * Assembles the webpack config used by the {@link Compiler}.
 *
 * Final configuration is accessible {@link Build.config}.
 * It can be rebuilt with {@link Build.rebuild}.
 */
interface Build extends Service {
  /**
   * Loader registry
   */
  loaders: {[key: string]: Build.Loader}

  /**
   * RuleSetUse item registry
   */
  items: {[key: string]: Build.Item}

  /**
   * Webpack rules registry
   */
  rules: {[key: string]: Build.Rule}

  /**
   * Webpack configuration
   */
  config: Configuration

  /**
   * Regenerate Webpack configuration
   */
  rebuild(): Configuration
}

/**
 * @namespace Build
 */
namespace Build {
  /**
   * @interface Build.Loader
   */
  export interface Loader {
    make(app: Framework): string
  }

  /**
   * @interface Build.Item
   */
  export interface Item {
    setLoader(loader: (app?: Framework) => Build.Loader): void

    setOptions(options: Build.Item.OptionsFn): void

    mergeOptions(
      options: Build.Item.Options,
      app: Framework,
    ): void

    make(app: Framework): Build.Item.Output
  }

  /**
   * @interface Build.Rule
   *
   * Wrapper for {@link RuleSetRule}
   */
  export interface Rule {
    /**
     * Wrapping {@link RuleSetRule.test}
     */
    test?: (app?: Framework) => RuleSetRule['test']

    /**
     * Returns an array of {@link Build.Item} values, each of which
     * can be built with {@link Build.Item.make} to produce {@link RuleSetRule.use} compatible output.
     */
    use?: (app?: Framework) => Item[]

    getTest(app: Framework): RegExp

    setTest(test: RegExp | Rule.TestFn): void

    getUse(app: Framework): Item[]

    setUse(use: Rule.UseFn): void

    getExclude(app: Framework): Rule.Output['exclude']

    setExclude(exclude: Rule.ExcludeFn | RegExp): void

    getType(app: Framework): Rule.Output['type']

    setType(type: string | Rule.TypeFn): void

    getParser(app: Framework): Rule.Parser

    setParser(parser: Rule.Parser | Rule.ParserFn): void

    getGenerator(app: Framework): any

    setGenerator(Generator: any | Rule.GeneratorFn): void

    /**
     * Returns final {@link RuleSetRule} for inclusion in {@link Build.config}
     */
    make(app: Framework): Rule.Output | RuleSetRule
  }

  /**
   * @namespace Build.Item
   */
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

  /**
   * @namespace Build.Loader
   */
  export namespace Loader {
    export type Output = string
    export type Src = (app?: Framework) => Output
    export type Input = Src | Output
  }

  /**
   * @namespace Build.Rule
   */
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
