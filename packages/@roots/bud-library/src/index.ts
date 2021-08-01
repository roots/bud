import './interface'

import {Framework, Library, Module} from '@roots/bud-framework'

const AutoDllPlugin = require('autodll-webpack-plugin')

/**
 * @interface AutoDllExtension
 */
interface AutoDllExtension {
  name: Module.Name & '@roots/bud-library'
  api: Module.Api & {
    library: Library.Configure
  }
}

/**
 * @const autodllExtension
 */
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

/**
 * @exports autodllExtension
 * @exports default
 */
export {autodllExtension, autodllExtension as default}

/**
 * @exports name
 * @exports api
 */
export const {name, api} = autodllExtension
