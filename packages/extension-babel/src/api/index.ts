import {addPlugin} from './addPlugin'
import {setOptions} from './setOptions'
import {addPreset} from './addPreset'
import {Bud} from '@roots/bud'

export function assignBabel(app: Bud): Bud {
  Object.assign(app, {
    /**
     * Babel config object.
     */
    babel: {
      /**
       * Set transform/loader options.
       */
      setOptions: setOptions.bind(app),

      /**
       * Plugins.
       */
      addPlugin: addPlugin.bind(app),

      /**
       * Presets.
       */
      addPreset: addPreset.bind(app),
    },
  })

  return app
}
