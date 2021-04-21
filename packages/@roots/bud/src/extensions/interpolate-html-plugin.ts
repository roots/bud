import {Container} from '@roots/container'
import {Framework, Module} from '@roots/bud-framework'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'

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
  ...Object.fromEntries(
    app.env
      .getEntries()
      .filter(([k]) => k.includes('APP_')) as Array<
      [string, RegExp]
    >,
  ),
  ...(app.store.get('extension.interpolateHtmlPlugin.replace') ??
    {}),
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
) => store.isTrue('html') && options.getEntries().length > 0
