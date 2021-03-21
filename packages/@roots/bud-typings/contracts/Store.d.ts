import {RequireExactlyOne, ValueOf} from 'type-fest'
import {Container, Framework, Webpack, Service} from './'

export interface Store extends Service {
  app: Framework
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
    | `theme`
    | `theme.${string}`
    | `env.${string}`
    | `server.${string}`
    | `server`
    | `env`
    | `locations`
    | `locations.${string}`
    | `patterns`
    | `patterns.${string}`
    | `project`
    | `project.${string}`
    | `options`
    | `options.${string}`
    | `compilation.${string}`
}
