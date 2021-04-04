import './interface'

import {Framework} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

/**
 * @module @roots/bud-library
 * @description Wrapper for autodll-webpack-plugin
 */
interface Extension {
  name: Framework.Module.Name
  api: Framework.Module.Api &
    ((
      app: Framework,
    ) => {
      library: Framework.Library.Configure
    })
}

const extension: Extension = {
  name: '@roots/bud-library',
  api: app => ({
    library(modules) {
      this.extensions.add({
        name: 'autodll-webpack-plugin',

        options: (app: Framework) => ({
          debug: false,
          inject: false,
          filename: this.store.isTrue('options.hash')
            ? this.store.get('options.hashFormat')
            : this.store.get('options.fileFormat'),
          entry: {
            library:
              typeof modules == 'string' ? [modules] : modules,
          },
          path: 'dll',
          inherit: false,
          context: app.project(),
        }),

        make: options => new AutoDllPlugin(options.all()),
      })

      return this
    },
  }),
}

export {extension as default}
