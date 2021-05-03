import {Hooks} from '@roots/bud-framework'
import {join} from 'path'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## path [💁 Fluent]
     *
     * Get a filepath.
     *
     * ### Usage
     *
     * Absolute path to the dist directory:
     *
     * ```js
     * app.path('dist')
     * ```
     *
     * Absolute path to `scripts/app.js` in the dist directory:
     *
     * ```js
     * app.path('dist', 'scripts/app.js')
     *  ```
     */
    path: Api.Path
  }

  namespace Api {
    export {Path}
  }
}

type PathKey = `${keyof Hooks.Locale.Definitions & string}`

type Path = (key: PathKey, path?: string) => string

export const path: Path = function (key, path?) {
  return join(
    ...[
      key !== 'project'
        ? this.hooks.filter('location/project')
        : false,
      this.hooks.filter(`location/${key}`),
      path ?? false,
    ].filter(Boolean),
  )
}
