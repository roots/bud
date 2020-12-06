import Framework from '@roots/bud-typings'

/**
 * Bud.Sass
 */
export as namespace Sass

export declare type Conditional = Framework.Factory<
  Framework.Rule.Conditional
>

export declare type Exclude = Framework.Factory<
  Framework.Rule.Conditional
>

export declare type UseLoader = (
  loader: string,
) => Framework.Rule.Contract

export interface Sass {
  bud: Framework.Bud.Contract
  methods: Array<[string, (cfg: any) => Framework.Bud.Contract]>
  init: Framework.Fluent<Sass>
  then: (this: Sass) => Framework.Bud.Contract
}

/**
 * Sass configuration utility constructor.
 */
export type Factory = (bud: Framework.Bud.Contract) => Sass
