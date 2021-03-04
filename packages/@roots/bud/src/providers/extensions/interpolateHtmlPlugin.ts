import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'
import {Framework, Module} from '@roots/bud-typings'

export const name = 'interpolate-html-plugin'

export const options: Framework.Module.Options<{
  [key: string]: RegExp
}> = bud =>
  Object.fromEntries(
    bud.env
      .getEntries()
      .filter(([string]) => string.includes('APP_')) as Array<
      [string, RegExp]
    >,
  )

export const make: Module.Make<
  InterpolateHtmlPlugin,
  Framework.Container<
    Framework.Module.Options<{
      [key: string]: RegExp
    }>
  >
> = options =>
  new InterpolateHtmlPlugin(
    HtmlWebpackPlugin,
    options.all() ?? {},
  )

export const when: Module.When = (app, options) =>
  app.store.enabled('options.html')
