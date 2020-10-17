import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'

export const options: OptionsFactory = bud => ({
  replacements: {
    ...bud.env,
  },
})

export const make: (
  options: Options,
) => InterpolateHtmlPlugin = ({replacements}) =>
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, replacements)

export const when: Adapter.when = ({features}) =>
  features.get('html') == true

declare type Options = {
  replacements: {
    [key: string]: string
  }
}

declare type OptionsFactory = (bud: Framework.Bud) => Options
