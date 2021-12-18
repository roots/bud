import '@roots/bud-babel'
import {Bud} from '@roots/bud'

/**
 * You can import or require babel plugins/presets, if you prefer.
 *
 * It seems like it might be slightly slower.
 */
import pluginProposalClassProperties from '@babel/plugin-proposal-class-properties'

/**
 * This is a kind of advanced example that ultimately configures
 * bud's babel plugins/presets exactly as they are out of the box.
 *
 * - In order to simply use babel you don't need to do anything except install it.
 * - If you want to use any of these presets or plugins but are otherwise providing your own
 *   configuration you don't need to specify them.
 */
export default async (app: Bud) => {
  app
    .entry('app', '*.{js,css}')
    .when(app.isProduction, app => {
      app.splitChunks().minimize().runtime('single')
    })
    .proxy()
    .tap(configureBabel)
}

/**
 * You can use `bud.tap` to organize your config, if desired.
 */
export const configureBabel = ({babel}: Bud) =>
  babel
    /**
     * Set presets
     */
    .setPresets({
      '@babel/preset-env': require.resolve('@babel/preset-env'),
    })

    /**
     * Set plugins
     */
    .setPlugins({
      '@babel/plugin-transform-runtime': [
        require.resolve('@babel/plugin-transform-runtime'),
        {helpers: false},
      ],
      '@babel/plugin-proposal-object-rest-spread':
        require.resolve(
          '@babel/plugin-proposal-object-rest-spread',
        ),
      '@babel/plugin-syntax-dynamic-import': require.resolve(
        '@babel/plugin-syntax-dynamic-import',
      ),
    })

    /**
     * Set plugin options
     *
     * @remarks
     * You may do the same with presets (bud.babel.setPresetOptions)
     */
    .setPluginOptions('@babel/plugin-transform-runtime', {
      helpers: false,
    })

    /**
     * Unset a plugin
     *
     * @remarks
     * you may do the same with presets (bud.babel.unsetPreset)
     */
    .unsetPlugin('@babel/plugin-proposal-class-properties')

    /**
     * Set a single plugin
     *
     * @remarks
     * you may do the same with presets (bud.babel.setPlugin)
     */
    .setPlugin(
      '@babel/plugin-proposal-class-properties',
      pluginProposalClassProperties,
    )
