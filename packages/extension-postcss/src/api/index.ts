/**
 * Configuration API
 */

import {Bud} from '@roots/bud'
import {addPlugin} from './addPlugin'
import {presetEnv} from './presetEnv'

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
      presetEnv: presetEnv.bind(app),
    },
  })

  return app
}
