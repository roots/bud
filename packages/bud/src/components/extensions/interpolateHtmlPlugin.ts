import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'
import {Framework, Module, Container} from '@roots/bud-typings'

export const options = (
  bud: Framework,
): Container['repository'] => ({
  ...Object.fromEntries(
    bud.env
      .getEntries()
      .filter(([string]) => string.includes('APP_')),
  ),
})

export const make: Module.Make<
  InterpolateHtmlPlugin,
  Container
> = (options: Module.Options) =>
  new InterpolateHtmlPlugin(
    HtmlWebpackPlugin,
    options.getStore(),
  )

export const when: Module.When = bud =>
  bud.features.enabled('html')
