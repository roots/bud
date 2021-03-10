import Plugin from 'optimize-css-assets-webpack-plugin'
import {Module} from '@roots/bud-typings'
import {Framework} from '@roots/bud-framework'
import cssProcessor from 'cssnano'

export const name = 'optimize-css-assets-webpack-plugin'

export const options: Module.Options<Plugin.Options> = (
  app: Framework,
) => ({
  assetNameRegExp: /\.css$/g,
  cssProcessor,
  cssProcessorOptions: {
    map: app.store.enabled('options.devtool')
      ? {
          inline: (devtool => {
            return devtool
              ? devtool.match(/inline-.*/)
                ? true
                : false
              : false
          })(
            app.hooks.filter(
              'webpack.devtool',
              app.store.get('options.devtool'),
            ),
          ),
        }
      : false,
  },
  cssProcessorPluginOptions: {
    preset: ['default', {discardComments: {removeAll: true}}],
  },
  canPrint: true,
})

export const make: Module.Make<
  Plugin,
  Plugin.Options
> = options => new Plugin(options.all())

export const when: Module.When = app =>
  app.store.enabled('options.minify')
