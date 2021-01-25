import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework<T> {
    /**
     * ## bud.src  [💁 Fluent]
     *
     * With no arguments, this function returns the project's src path.
     * Optionally, **bud.src** may be passed a path relative to the project src
     * directory. In this case it returns the absolute path of whatever it was
     * passed.
     *
     * Root path used by this function is set by [bud.srcPath](#). [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.src('scripts/app.js')
     * ```
     */
    src: Framework.Api.Src
  }

  namespace Framework.Api {
    export type Src = (this: Framework, path?: string) => string
  }
}

export const src: Framework.Api.Src = function (path) {
  return path
    ? this.disk.path.join(this.options.access('project'), path)
    : this.disk.path.join(
        this.options.access('project'),
        this.options.access('src'),
      )
}
