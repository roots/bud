import type {Service, Framework} from './'
import type Webpack from 'webpack/types'

/**
 * @interface Build
 *
 * Responsible for assembling the webpack config used
 * by the compiler.
 *
 * Access the config with `build.config`.
 * It can be rebuilt with `build.rebuild()`.
 */
interface Build extends Service {
  /**
   * ## config
   *
   * Webpack configuration
   */
  config: Webpack.Configuration

  /**
   * ## rebuild
   *
   * Regenerate Webpack configuration
   */
  rebuild(): Webpack.Configuration

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
    setLoader(loader: (app?: Framework) => Loader): void

    setOptions(options: (app?: Framework) => Item.Options): void

    mergeOptions(options: Item.Options, app: Framework): void

    make(app: Framework): Item.Output
  }

  /**
   * @interface Build.Rule
   */
  export interface Rule {
    getTest(app: Framework): RegExp

    setTest(test: RegExp | ((app?: Framework) => RegExp)): void

    getUse(app: Framework): Item[]

    setUse(use: (app?: Framework) => Item[]): void

    getExclude(app: Framework): Rule.Output['exclude']

    setExclude(
      exclude: ((app?: Framework) => RegExp) | RegExp,
    ): void

    getType(app: Framework): Rule.Output['type']

    setType(type: string | ((app?: Framework) => string)): void

    getParser(app: Framework): Rule.Parser

    setParser(
      parser: Rule.Parser | ((app?: Framework) => Rule.Parser),
    ): void

    getGenerator(app: Framework): any

    setGenerator(
      Generator: any | ((app?: Framework) => any),
    ): void

    make(app: Framework): Rule.Output
  }

  export namespace Item {
    export type OptionsFn = (app?: Framework) => Options
    export type Options = {[key: string]: any}

    export interface ConstructorOptions {
      loader: Loader | ((app?: Framework) => Loader)
      options?: OptionsFn | Options
    }

    export interface Output {
      loader: Loader.Output
      options?: {[key: string]: any}
    }
  }

  export namespace Loader {
    export type Output = string
    export type Src = (app?: Framework) => Output
    export type Input = Src | Output
  }

  export namespace Rule {
    export interface Parser {
      parse: (input?: string) => any
    }

    export interface Options {
      test: RegExp | ((app?: Framework) => RegExp)
      use?: Item[] | ((app?: Framework) => Item[])
      exclude?: RegExp | ((app?: Framework) => RegExp)
      type?: string | ((app?: Framework) => string)
      parser?: ((app?: Framework) => Parser) | Parser
      generator?: ((app?: Framework) => any) | any
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
