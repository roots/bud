import {RequireExactlyOne, ValueOf} from 'type-fest'
import {Container, Framework, Webpack} from './'

export interface Store extends Container {
  app: Framework

  access<T = any>(key: string): T

  get<T = any>(path: Store.Keys): T
}

declare namespace Store {
  type PathImpl<T, Key extends keyof T> = Key extends string
    ? T[Key] extends Record<string, any>
      ?
          | `${Key}.${PathImpl<
              T[Key],
              Exclude<keyof T[Key], keyof any[]>
            > &
              string}`
          | `${Key}.${Exclude<keyof T[Key], keyof any[]> &
              string}`
      : never
    : never

  type PathImpl2<T> = PathImpl<T, keyof T> | keyof T

  type Path<T> = PathImpl2<T> extends string | keyof T
    ? PathImpl2<T>
    : keyof T

  type PathValue<
    T,
    P extends Path<T>
  > = P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? Rest extends Path<T[Key]>
        ? PathValue<T[Key], Rest>
        : never
      : never
    : P extends keyof T
    ? T[P]
    : never

  type Argument = string

  type Envvar = string

  type Pattern = string

  type Keys =
    | `webpack.entry`
    | `webpack.devtool`
    | `webpack.plugins.${Store.Path<
        Webpack.Configuration['plugins']
      >}`
    | `webpack.stats.${Store.Path<
        Webpack.Configuration['stats']
      >}`
    | `webpack.module.${Store.Path<
        Webpack.Configuration['module']
      >}`
    | `webpack.optimization.${Store.Path<
        Webpack.Configuration['optimization']
      >}`
    | `webpack.performance.${Store.Path<
        Webpack.Configuration['performance']
      >}`
    | `webpack.resolve.${Store.Path<
        Webpack.Configuration['resolve']
      >}`
    | `webpack.${keyof Webpack.Configuration}`
    | `webpack`
    | `args.${string}`
    | `args`
    | `theme`
    | `theme.${string}`
    | `env.${string}`
    | `server.${string}`
    | `server`
    | `env`
    | `patterns.${string}`
    | `compilation.${string}`
}
