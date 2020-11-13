import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'
import {Bud, Env, Extension, Indexed} from '@roots/bud-typings'

export const options = (bud: Bud) => ({
  replacements: bud.env.getStore(),
})

export const make: Extension.Make<
  InterpolateHtmlPlugin,
  Indexed<Env.Contract>
> = (options: Extension.Options) =>
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, options.all())

export const when: Extension.When = bud =>
  bud.features.enabled('html')
