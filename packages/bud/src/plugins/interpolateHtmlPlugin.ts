import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'
import {Extension} from '@roots/bud-extensions'

export const options: Extension.RawOptions<PluginOptions> = bud => ({
  replacements: bud.env.all(),
})

export const make: Extension.Make<
  InterpolateHtmlPlugin,
  PluginOptions
> = (options: Extension.Options) =>
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, options.all())

export const when: Extension.When = bud =>
  bud.features.enabled('html')

export interface PluginOptions {
  replacements: {
    [key: string]: string
  }
}
