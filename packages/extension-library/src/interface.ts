import '@roots/bud'

declare module '@roots/bud' {
  interface Bud {
    /**
     * ## library  [💁 Fluent]
     *
     * Enables DLL ([dynamic link library](https://en.wikipedia.org/wiki/Dynamic-link_library)) caching of specified modules.
     *
     * ### Usage
     *
     * Supply `app.library` the module you would like to add to the DLL.
     *
     * ```js
     * app.library('jquery')
     * ```
     *
     * Multiple modules can be added at once using an array
     *
     * ```js
     * app.library(['react', 'react-dom'])
     * ```
     */
    library: Bud.Library.Configure
  }

  export namespace Bud.Library {
    export type Configure = (this: Bud, modules: string[]) => Bud
  }
}
