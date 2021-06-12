import type {Framework} from '../Framework'
import type {Item} from './Item'

namespace Rule {
  export type TestFn = (app?: Framework) => RegExp
  export type UseFn = (app?: Framework) => Item[]
  export type ExcludeFn = (app?: Framework) => RegExp
  export type TypeFn = (app?: Framework) => string

  export type Parser = {
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

interface Rule {
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

  make(app: Framework): Rule.Output
}

export {Rule}
