import {Service} from '../Service'

import type {Framework} from '../Framework'
import type Webpack from 'webpack/types'

/**
 * Build
 *
 * Responsible for assembling the webpack config used
 * by the compiler.
 *
 * Access the config with `build.config`. It is
 * a dynamic getter and referencing the property
 * is equivalent to rebuilding the configuration
 * entirely.
 */
interface Build extends Service {
  /**
   * ## config
   *
   * Webpack configuration
   */
  config: Webpack.Configuration

  /**
   * ## entry
   *
   * Webpack entry configuration
   */
  entry: Webpack.Configuration['entry']

  /**
   * ## plugins
   *
   * Webpack plugins configuration
   */
  plugins: Webpack.Configuration['plugins']

  /**
   * ## loaders
   *
   * Loader registry
   */
  loaders: {[key: string]: Build.Loader}

  /**
   * ## items
   *
   * RuleSetUse item registry
   */
  items: {[key: string]: Build.Item}

  /**
   * ## rules
   *
   * Webpack rules registry
   */
  rules: {[key: string]: Build.Rule}
}

namespace Build {
  export interface Loader {
    make(app: Framework): string
  }

  export interface Item {
    setLoader(loader: (app?: Framework) => Build.Loader): void

    setOptions(options: Build.Item.OptionsFn): void

    mergeOptions(
      options: Build.Item.Options,
      app: Framework,
    ): void

    make(app: Framework): Build.Item.Output
  }

  export interface Rule {
    getTest(app: Framework): RegExp

    setTest(test: RegExp | Build.Rule.TestFn): void

    getUse(app: Framework): Item[]

    setUse(use: Build.Rule.UseFn): void

    getExclude(app: Framework): Rule.Output['exclude']

    setExclude(exclude: Rule.ExcludeFn | RegExp): void

    getType(app: Framework): Rule.Output['type']

    setType(type: string | Rule.TypeFn): void

    getParser(app: Framework): Rule.Parser

    setParser(parser: Rule.Parser | Rule.ParserFn): void

    getGenerator(app: Framework): any

    setGenerator(Generator: any | Rule.GeneratorFn): void

    make(app: Framework): Rule.Output
  }
}

namespace Build {
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
