import '@roots/bud-typings'

/**
 * Bud.Sass
 */
export as namespace Sass

export declare type Conditional = Framework.Rule.Factory<
  Framework.Rule.Conditional
>

export declare type Exclude = Framework.Rule.Factory<
  Framework.Rule.Conditional
>

export declare type UseLoader = (
  loader: string,
) => Framework.Rule

export interface Sass {
  bud: Framework.Bud
  methods: Array<[string, Sass.Config]>
  init: Framework.Fluent<Sass>
  next: (this: Sass) => Framework.Bud
}

/**
 * Sass configuration utility.
 */
export type Config = Framework.Fluent<Sass>

/**
 * Sass configuration utility constructor.
 */
export type Factory = (bud: Framework.Bud) => Sass
