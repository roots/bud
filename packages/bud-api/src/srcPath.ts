import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## srcPath [💁 Fluent]
     *
     * Sets the root directory for source files.
     *
     * By default this directory is set as `src`.
     *
     * ### Usage
     *
     * ```js
     * app.srcPath('build')
     * ```
     */
    srcPath: Framework.Api.SrcPath
  }

  namespace Framework.Api {
    export type SrcPath = (
      this: Framework,
      path: string,
    ) => Framework
  }
}

export const srcPath: Framework.Api.SrcPath = function (path) {
  /** Bounce early if src is overwritten from CLI */
  if (
    this.store.has('args.src') &&
    this.store.isString('args.src')
  )
    return this

  this.options.set('src', path)

  return this
}
