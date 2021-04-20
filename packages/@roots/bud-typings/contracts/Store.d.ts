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
    | `location`
    | `location.${string}`
    | `patterns`
    | `patterns.${string}`
    | `project`
    | `project.${string}`
    | `compilation.${string}`
    | `build`
    | `build.resolve`
    | `build.${string}`
    | `hash`
    | `hashFormat`
    | `fileFormat`
    | `ci`
    | `clean`
    | `define`
    | `debug`
    | `discover`
    | `html`
    | `html.replace`
    | `html.enabled`
    | `html.template`
    | `manifest`
    | `extension`
    | `extension.${string}`
}
