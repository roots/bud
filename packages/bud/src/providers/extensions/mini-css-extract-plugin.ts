import type {Module, Item} from '@roots/bud-typings'
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
export const setItems: Module.Register<Item> = [
  'minicss',
  {
    loader: MiniCssExtractPlugin.loader,
    options: {},
  },
]
