import type {Module} from '@roots/bud-typings'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * MiniCssExtractPlugin
 */
export const make: Module.Make = options =>
  new MiniCssExtractPlugin(options.all())

/**
 * Run in production
 */
export const options: Module.Options = {}

/**
 * Run in production
 */
export const when: Module.When = bud =>
  bud.options.is('mode', 'production')

/**
 * Register mini-css-extract-plugin ruleset item
 */
export const boot: Module.Boot = app => {
  app.build.set('items.minicss', {
    loader: MiniCssExtractPlugin.loader,
    options: {},
  })
}
