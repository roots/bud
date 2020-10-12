// eslint-disable-next-line @typescript-eslint/no-var-requires
const {HtmlWebpackPlugin} = require('html-webpack-plugin')
import {InterpolateHtmlPlugin} from '@roots/bud-support'

export const options: Options = {
  replacements: {
    APP_TITLE: '@roots/bud',
  },
}

export const make: (
  options: Options,
) => InterpolateHtmlPlugin = ({replacements}) =>
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, replacements)

export const when: Adapter.when = ({store}) =>
  store['features'].enabled('html')

declare type Options = {
  replacements: {
    [key: string]: string
  }
}
