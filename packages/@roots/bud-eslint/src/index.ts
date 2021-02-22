import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import Plugin from 'eslint-webpack-plugin'
import {eslintFormatter} from '@roots/bud-support'

/**
 * Extension identifier
 */
export const name = 'eslint-webpack-plugin'

/**
 * Eslint class options.
 */
export const options: Module.Options = app => {
  const options: Framework.Eslint.Options = {
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
export const make: Module.Make = opts => new Plugin(opts.all())
