import {Container} from '@roots/container'
import {Framework, Module} from '@roots/bud-framework'
import {HtmlWebpackPlugin} from './html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'

declare type Options = (
  app: Framework,
) => Module.Options<{
  [key: string]: RegExp
}>

declare type Make = Module.Make<
  InterpolateHtmlPlugin,
  Container<
    Module.Options<{
      [key: string]: RegExp
    }>
  >
>

/**
 * Name
 */
export const name = 'interpolate-html-plugin'

/**
 * Options
 */
export const options: Options = app => {
  const env = Object.fromEntries(
    app.env
      .getEntries()
      .filter(([k]) => k.includes('APP_')) as Array<
      [string, RegExp]
    >,
  )

  const store =
    app.store.get('extension.interpolateHtmlPlugin.replace') ??
    {}

  return {
    ...env,
    ...store,
  }
}

/**
 * Make
 */
export const make: Make = options =>
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, options.all())

/**
 * When
 */
export const when: Module.When = (
  _app: Framework,
  options: Module.Options,
) => options.getEntries().length > 0
