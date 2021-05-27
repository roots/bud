import './interface'

import {Framework, Library, Module} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

/**
 * @module @roots/bud-library
 * @description Wrapper for autodll-webpack-plugin
 */
interface Extension {
  name: Module.Name
  api: Module.Api &
    ((app: Framework) => {
      library: Library.Configure
    })
}

/**
 * bud-library extension
 */
const extension: Extension = {
  /**
   * @property name
   */
  name: '@roots/bud-library',

  /**
   * @property api
   */
  api: app => ({
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
  }),
}

export {extension as default}
