// Interface
import './interface'
// Core typings
import {Bud} from '@roots/bud'
// Eslint webpack plugin
import Plugin from 'eslint-webpack-plugin'
// Bud custom formatter
import {eslintFormatter} from '@roots/bud-support'

/**
 * Extension identifier
 */
export const name = 'eslint-webpack-plugin'

/**
 * Eslint class options.
 */
export const options: Bud.Module.Options = app => {
  const options: Bud.Eslint.Options = {
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    cache: true,
    cacheLocation: app.disk.path.join(
      app.options.get('project'),
      app.options.get('storage'),
    ),
    quiet: true,
    formatter: eslintFormatter,
    context: app.src('*'),
  }

  return options
}

/**
 * Make the plugin from its options.
 */
export const make: Bud.Module.Make = opts =>
  new Plugin(opts.all())
