import '@roots/bud-typings'

export declare type Conditional = Framework.Rule.Factory<
  Framework.Rule.Conditional
>

export declare type Exclude = Framework.Rule.Factory<
  Framework.Rule.Conditional
>

export declare type UseLoader = (loader: string) => Framework.Rule
