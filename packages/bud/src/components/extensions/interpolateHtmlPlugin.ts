import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'
import {Bud, Extension, Container} from '@roots/bud-typings'

export const options = (
  bud: Bud.Contract,
): Container['repository'] => ({
  ...Object.fromEntries(
    bud.env
      .getEntries()
      .filter(([string]) => string.includes('APP_')),
  ),
})

export const make: Extension.Make<
  InterpolateHtmlPlugin,
  Container
> = (options: Extension.Options) =>
  new InterpolateHtmlPlugin(
    HtmlWebpackPlugin,
    options.getStore(),
  )

export const when: Extension.When = bud =>
  bud.features.enabled('html')
