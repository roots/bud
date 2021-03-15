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
    export {SrcPath}
  }
}

type SrcPath = (this: Framework, path: string) => Framework

export const srcPath: SrcPath = function (path) {
  this.when(
    !this.store.has('args.src') ||
      !this.store.isString('args.src'),
    () => this.publish({'location/src': path}, 'api/srcPath'),
  )

  return this
}
