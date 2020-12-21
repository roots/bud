import {
  Factory,
  Fluent,
  Rule,
  Framework,
} from '@roots/bud-typings'

export as namespace Sass

export declare type Conditional = Factory<Rule.Conditional>

export declare type Exclude = Factory<Rule.Conditional>

export declare type UseLoader = (loader: string) => Rule

export interface Sass {
  bud: Framework
  methods: Array<[string, (cfg: any) => Framework]>
  init: Fluent<Sass>
  then: (this: Sass) => Framework
}
