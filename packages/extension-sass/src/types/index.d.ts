import {Factory, Fluent, Rule, Bud} from '@roots/bud-typings'

/**
 * Bud.Sass
 */
export as namespace Sass

export declare type Conditional = Factory<Rule.Conditional>

export declare type Exclude = Factory<Rule.Conditional>

export declare type UseLoader = (loader: string) => Rule.Contract

export interface Sass {
  bud: Bud
  methods: Array<[string, (cfg: any) => Bud]>
  init: Fluent<Sass>
  then: (this: Sass) => Bud
}
