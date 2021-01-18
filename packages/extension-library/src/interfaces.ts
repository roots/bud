import '@roots/bud'

declare module '@roots/bud' {
  interface Bud {
    /**
     * ## bud.library  [💁 Fluent]
     *
     * Enables DLL ([dynamic link library](https://en.wikipedia.org/wiki/Dynamic-link_library)) caching of specified modules.
     *
     * ### Usage
     *
     * Supply `bud.library` the module you would like to add to the DLL.
     *
     * ```js
     * bud.library('jquery')
     * ```
     *
     * Multiple modules can be added at once by passing an array
     *
     * ```js
     * bud.library(['react', 'react-dom'])
     * ```
     */
    library: Bud.Library.Configure
  }

  namespace Bud.Library {
    export type Configure = (this: Bud, modules: string[]) => Bud
  }
}
