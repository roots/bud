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

export const when: Framework.Extension.When = ({features}) =>
  features.get('html') == true

declare type Options = {
  replacements: {
    [key: string]: any
  }
}

declare type OptionsFactory = (bud: Framework.Bud) => Options
