import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'
import {Container, Module} from '@roots/bud-typings'
import {Framework} from '@roots/bud-framework'

/**
 * Interpolate HTML Plugin options
 */
declare type Options = (
  app: Framework,
) => Module.Options<{
  [key: string]: RegExp
}>

/**
 * Interpolate HTML Plugin factory
 */
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
export const options: Options = app => ({
  ...app.store.get('options.html.replacements'),
  ...Object.fromEntries(
    app.env
      .getEntries()
      .filter(([k]) => k.includes('APP_')) as Array<
      [string, RegExp]
    >,
  ),
})

/**
 * Make
 */
export const make: Make = options =>
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, options.all())

/**
 * When
 */
export const when: Module.When = (
  {store}: Framework,
  options: Module.Options,
) =>
  store.isTrue('options.html.enabled') &&
  options.getEntries().length > 0
