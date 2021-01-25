import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework<T> {
    /**
     * ## bud.dist  [💁 Fluent]
     *
     * With no arguments, this function returns the path where built assets will
     * be written.
     *
     * Optionally, **bud.dist** may be passed a path relative to the project dist
     * directory. In this case it will return the path as an abspath. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * Absolute path to the dist directory:
     *
     * ```js
     * bud.dist()
     * ```
     *
     * Absolute path to `scripts/app.js` in the dist directory:
     *
     * ```js
     * bud.dist('scripts/app.js')
     *  ```
     */
    dist: Framework.Api.Dist
  }

  namespace Framework.Api {
    export type Dist = (this: Framework, path?: string) => string
  }
}

export const dist: Framework.Api.Dist = function (path?) {
  return path
    ? this.disk.path.join(
        this.options.access('project'),
        this.options.access('dist'),
        path,
      )
    : this.disk.path.join(
        this.options.access('project'),
        this.options.access('dist'),
      )
}
