import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'

import {addPlugin} from './api/addPlugin'
import {setOptions} from './api/setOptions'
import {addPreset} from './api/addPreset'
import {setPresets} from './api/setPresets'

/**
 * Extension ident
 */
export const name: Module['name'] = '@roots/bud-babel'

/**
 * Register babel
 */
export const boot: Module['boot'] = (app: Framework) => {
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

      /**
       * Set presets
       */
      setPresets: setPresets.bind(app),
    },
  })

  app.build
    .set('loaders.babel', require.resolve('babel-loader'))
    .set('items.babel', {
      loader: app.build.get('loaders.babel'),
      options: {
        presets: [],
        plugins: [],
      },
    })
    .mutate('rules.js.use', () => [
      app.build.access('items.cache'),
      app.build.access('items.thread'),
      app.build.access('items.babel'),
    ])

  app.babel
    .addPreset('@babel/preset-env')
    .babel.addPlugin('@babel/plugin-transform-runtime', {
      helpers: false,
    })
    .babel.setOptions({
      root: app.project(),
      cacheDirectory: app.project(app.options.get('storage')),
    })
}
