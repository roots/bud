import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.storage [💁 Fluent]
     *
     * Directory to use for build artifacts.
     *
     * ```js
     * bud.storage('.custom-dir')
     * ``
     */
    storage: Framework.Api.Storage
  }

  namespace Framework.Api {
    export type Storage = (
      this: Framework,
      path: string,
    ) => Framework
  }
}

export const storage: Framework.Api.Storage = function (path?) {
  if (path) {
    this.options.set('storage', path)
  }

  return this
}
