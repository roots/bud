declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.src  [💁 Fluent]
     *
     * With no arguments, this function returns the project's src path.
     * Optionally, **bud.src** may be passed a path relative to the project src
     * directory. In this case it returns the absolute path of whatever it was
     * passed.
     *
     * Root path used by this function is set by [bud.srcPath]
     *
     * ### Usage
     *
     * ```js
     * bud.src('scripts/app.js')
     * ```
     */
    src: Framework.Src
  }

  namespace Framework {
    export type {Src}
  }
}

type Src = (path?: string) => string

export const src: Src = function (path) {
  return this.disk.path.join(
    this.subscribe('location/project'),
    this.subscribe('location/src'),
    path ?? '',
  )
}
