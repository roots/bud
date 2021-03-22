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

type Storage = (path: string) => Framework

export const storage: Storage = function (path?) {
  if (path) {
    this.publish({'location/storage': path}, 'api/storage')
  }

  return this
}
