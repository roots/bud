import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  export interface Framework {
    /**
     * ## bud.storage [💁 Fluent]
     *
     * Directory to use for build artifacts.
     *
     * ```js
     * bud.storage('.custom-dir')
     * ```
     */
    storage: Framework.Api.Storage
  }

  namespace Framework.Api {
    export {Storage}
  }
}

type Storage = (this: Framework, path: string) => Framework

export const storage: Storage = function (path?) {
  if (path) {
    this.hooks.on('location/storage', () => path)
    return this
  }

  return this.hooks.filter('location/storage')

  return this
}
