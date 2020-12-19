import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'
import {Bud, Extension, Container} from '@roots/bud-typings'

export const options = (bud: Bud): Container['repository'] => ({
  ...Object.fromEntries(
    bud.env
      .getEntries()
      .filter(([string]) => string.includes('APP_')),
  ),
})

export const make: Extension.Module.Make<
  InterpolateHtmlPlugin,
  Container
> = (options: Extension.Module.Options) =>
  new InterpolateHtmlPlugin(
    HtmlWebpackPlugin,
    options.getStore(),
  )

export const when: Extension.Module.When = bud =>
  bud.features.enabled('html')
