import type {Bud} from '@roots/bud-framework'
import type {Options as HtmlOptions} from 'html-webpack-plugin'

import BudHtmlWebpackPlugin from './html-webpack-plugin.extension.js'
import BudInterpolateHtmlPlugin from './interpolate-html-plugin.extension.js'

export interface template {
  (userOptions?: Options | boolean): Promise<Bud>
}

export interface facade {
  (userOptions?: Options | boolean): Bud
}

/**
 * Template function options
 *
 * @public
 */
interface Options extends HtmlOptions {
  /**
   * Path to an HTML template to use. If none is supplied
   * one is provided as a default.
   */
  template?: string

  /**
   * Template variable names are used as keys.
   * Each key is associated with a replacement value.
   */
  replace?: {
    [key: string]: string
  }
}

export const template: template = async function (
  userOptions?: Options | boolean,
): Promise<Bud> {
  const app = this as Bud

  if (userOptions === false) {
    app.hooks.on('feature.html', false)
    return app
  }

  app.hooks.on('feature.html', true)

  /**
   * Add {@link BudHtmlWebpackPlugin} if it isn't already added
   */
  if (!app.extensions.has('html-webpack-plugin')) {
    await app.extensions.add(BudHtmlWebpackPlugin)
  }

  /**
   * Add {@link BudInterpolateHtmlPlugin} if it isn't already added
   */
  if (!app.extensions.has('interpolate-html-plugin')) {
    await app.extensions.add(BudInterpolateHtmlPlugin)
  }

  /**
   * If there were no options specified, we're done.
   */
  if (!userOptions || userOptions === true) return app

  /**
   * Plugin references
   */
  const plugins = {
    html: app.extensions.get('html-webpack-plugin'),
    interpolate: app.extensions.get('interpolate-html-plugin'),
  }

  app.info('processing html-webpack-plugin options')
  plugins.html.setOptions(userOptions)

  /**
   * If there were no replacements specified, we're done.
   */
  if (!userOptions.replace) return app

  app.info('processing bud-interpolate-html-plugin options')
  plugins.interpolate.setOptions(userOptions.replace)

  return app
}
