import {addPlugin, setPluginOptions} from './api'
import {Bud} from '@roots/bud'

/**
 * Types
 */
import './interfaces'

/**
 * Preset env
 */
const defaultPresetEnv = {
  autoprefixer: {
    flexbox: 'no-2009',
  },
  stage: 1,
}

/**
 * Extension name
 */
export const name = '@roots/bud-postcss'

/**
 * Replace default css implementation
 */
export const boot = (app: Bud) => {
  Object.assign(app, {
    /**
     * PostCss config object.
     */
    postcss: {
      /**
       * Plugins.
       */
      addPlugin: addPlugin.bind(app),
      /**
       * Presets.
       */
      setPluginOptions: setPluginOptions.bind(app),
    },
  })

  app.build.set('items.postcss', {
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        plugins: [],
      },
    },
  })

  app.build.set('rules.css.use', (app: Bud) => {
    const postCss = app.build.access('items.postcss')

    postCss.options.postcssOptions.plugins = Object.values(
      postCss.options.postcssOptions.plugins,
    )

    return [
      app.isProduction
        ? app.build.access('items.minicss')
        : app.build.access('items.style'),
      app.build.access('items.css'),
      postCss,
      app.build.access('items.resolveUrl'),
    ].filter(Boolean)
  })

  // configure defaults
  app.postcss
    .addPlugin('postcss-flexbugs-fixes')
    .postcss.addPlugin('postcss-preset-env', defaultPresetEnv)
    .postcss.addPlugin('postcss-import')
}
