import {Framework} from './'
import {Webpack} from './'

/**
 * Rule
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Rule
  extends Framework.Service,
    Framework.Rule.Module {
  /**
   * Produce rulesetrule
   *
   * @see RuleSetRule
   */
  make(): Webpack.RuleSetRule
}

export namespace Rule {
  export interface Module {
    enforce?: Framework.MaybeCallable<Enforce, Framework>

    exclude?: Framework.MaybeCallable<RegExp, Framework>

    include?: Framework.MaybeCallable<RegExp, Framework>

    issuer?: Framework.MaybeCallable<RegExp, Framework>

    oneOf?: Framework.MaybeCallable<OneOf, Framework>

    options?: Framework.MaybeCallable<
      Framework.Index<any>,
      Framework
    >

    parser?: Framework.MaybeCallable<Parser, Framework>

    resolve?: Framework.MaybeCallable<Resolve, Framework>

    sideEffects?: Framework.MaybeCallable<SideEffects, Framework>

    query?: Framework.MaybeCallable<Query, Framework>

    type?: Framework.MaybeCallable<Type, Framework>

    resource?: Framework.MaybeCallable<Conditional, Framework>

    resourceQuery?: Framework.MaybeCallable<
      Conditional,
      Framework
    >

    compiler?: Framework.MaybeCallable<Conditional, Framework>

    rules?: Framework.MaybeCallable<OneOf, Framework>

    test?: Framework.MaybeCallable<RegExp, Framework>

    use?: Framework.MaybeCallable<
      Array<Framework.Index<any>>,
      Framework
    >
  }

  export type Resolve = Framework.Index<
    Webpack.Configuration['resolve']
  >

  export type Type =
    | 'javascript/auto'
    | 'javascript/dynamic'
    | 'javascript/esm'
    | 'json'
    | 'webassembly/experimental'

  export type Enforce = 'pre' | 'post'

  export type Conditional = boolean

  export type Parser = Framework.Index<any>

  export type Query = string | Parser

  export type SideEffects = boolean

  export type Options = Framework.Index<any>

  export type OneOf = Array<Webpack.RuleSetRule>

  export type Use = Array<Framework.Index<any>>
}
