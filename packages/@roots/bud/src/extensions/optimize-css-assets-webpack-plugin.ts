import Plugin from 'optimize-css-assets-webpack-plugin'
import {Module} from '@roots/bud-typings'
import {Framework} from '@roots/bud-framework'
import cssProcessor from 'cssnano'

export const name = 'optimize-css-assets-webpack-plugin'

export const options: Module.Options<Plugin.Options> = (
  app: Framework,
) => {
  const devtool = app.store.get('options.devtool')

  return {
    assetNameRegExp: /\.css$/g,
    cssProcessor,
    cssProcessorOptions: {
      map: devtool
        ? {
            inline: devtool.match(/inline-.*/) ? true : false,
          }
        : false,
    },
    cssProcessorPluginOptions: {
      preset: ['default', {discardComments: {removeAll: true}}],
    },
    canPrint: true,
  }
}

export const make: Module.Make<
  Plugin,
  Plugin.Options
> = options => new Plugin(options.all())

export const when: Module.When = app =>
  app.store.enabled('options.minimize')
