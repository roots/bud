/**
 * Configuration API
 */
import {Bud} from '@roots/bud'
import {addPlugin} from './addPlugin'
import {setPluginOptions} from './setPluginOptions'

export function assignPostCss(app: Bud): Bud {
  Object.assign(app, {
    postcss: {
      /**
       * Set transform/loader options.
       */
      addPlugin: addPlugin.bind(app),

      /**
       * Plugins.
       */
      setPluginOptions: setPluginOptions.bind(app),
    },
  })

  return app
}
