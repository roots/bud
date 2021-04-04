import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
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
    library: Framework.Library.Configure
  }

  namespace Framework {
    namespace Library {
      type Configure = (
        this: Framework,
        modules: string[],
      ) => Framework
    }

    namespace Hooks {
      namespace Extension {
        interface Definitions {
          '@roots/bud-library': Framework.Extension
          'autodll-webpack-plugin': Framework.Extension
        }
      }
    }
  }
}
