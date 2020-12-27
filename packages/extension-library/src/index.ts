export * as api from './api'

declare module '@roots/bud-typings' {
  interface Framework {
    library: Framework.Library
  }

  namespace Framework {
    /**
     * ## bud.library  [💁 Fluent]
     *
     * Enables DLL ([dynamic link library](https://en.wikipedia.org/wiki/Dynamic-link_library))
     * caching of specified modules.
     *
     * - [🔗 Documentation](#)
     *
     * ### Usage
     *
     * Pass `bud.library` the module
     * you would like to add to the DLL cache:
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
    export type Library = (
      this: Framework,
      modules: string[],
    ) => Framework
  }
}
