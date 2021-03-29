import {RequireExactlyOne, ValueOf} from 'type-fest'
import {Container, Framework, Webpack, Service} from './'

export interface Store extends Service {
  app: Framework
  get<T = any>(path: Store.Keys): T
}

declare namespace Store {
  type Keys =
    | `theme`
    | `theme.${string}`
    | `server.${string}`
    | `server`
    | `env`
    | `env.${string}`
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
