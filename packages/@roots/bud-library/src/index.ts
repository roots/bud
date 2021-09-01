import {Framework, Module} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

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
    library: Library.Configure
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-library': Module
      'autodll-webpack-plugin': Module
    }
  }
}

namespace Library {
  export type Configure = (modules: string[]) => Framework
}

interface AutoDllExtension {
  name: Module.Name & '@roots/bud-library'
  api: Module.Api & {
    library: Library.Configure
  }
}

const autodllExtension: AutoDllExtension = {
  name: '@roots/bud-library',

  api: {
    library(modules) {
      this.extensions.add({
        name: 'autodll-webpack-plugin',

        options: (app: Framework) => ({
          debug: false,
          inject: false,
          filename: this.store.isTrue('hash')
            ? this.store.get('hashFormat')
            : this.store.get('fileFormat'),
          entry: {
            library:
              typeof modules == 'string' ? [modules] : modules,
          },
          path: 'dll',
          inherit: false,
          context: app.path('project'),
        }),

        make: options => new AutoDllPlugin(options.all()),
      })

      return this
    },
  },
}

export const {name, api} = autodllExtension
