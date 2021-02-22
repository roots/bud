/**
 * Providers
 */
import type {Framework} from './'

export interface Service {
  app: Framework
  register?(): void
  boot?(): void
}

declare namespace Providers {
  export interface Definition {
    [name: string]: [
      service: Constructor,
      options?: {
        onInit?: Options['onInit']
        containers?: Framework.Index<unknown>
        dependencies?: Framework.Index<unknown>
      },
    ]
  }

  export interface Constructor {
    new (
      get: Framework['get'],
      containers?: Framework.Index<unknown>,
      dependencies?: Framework.Index<unknown>,
    ): Framework.Service
  }

  export type Options = {
    onInit?(): void
    containers?: Framework.Index<unknown>
    dependencies?: Framework.Index<unknown>
  }
}
