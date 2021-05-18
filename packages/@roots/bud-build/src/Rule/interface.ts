import type {Framework} from '@roots/bud-framework'
import type {Item} from '../Item/interface'

export {Rule}

namespace Rule {
  export type TestFn = (app?: Framework) => RegExp
  export type UseFn = (app?: Framework) => Item[]
  export type ExcludeFn = (app?: Framework) => RegExp
  export type TypeFn = (app?: Framework) => string

  export interface Output {
    test: RegExp
    exclude?: RegExp
    use?: Item.Output[]
    type?: string
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

  make(app: Framework): Rule.Output
}
