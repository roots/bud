import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'
import {Bud, Extension, Container} from '@roots/bud-typings'

export const options = (
  bud: Bud.Contract,
): {replacements: Container['repository']} => ({
  replacements: bud.env.getStore(),
})

export const make: Extension.Make<
  InterpolateHtmlPlugin,
  Container
> = (options: Extension.Options) =>
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, options.all())

export const when: Extension.When = bud =>
  bud.features.enabled('html')
