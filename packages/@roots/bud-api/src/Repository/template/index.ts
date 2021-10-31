import type {Framework} from '@roots/bud-framework'
import type {Options as HtmlOptions} from 'html-webpack-plugin'
import {isBoolean, isUndefined} from 'lodash'

import {BudHtmlWebpackPlugin} from './BudHtmlWebpackPlugin'
import * as BudInterpolateHtmlPlugin from './BudInterpolateHtmlPlugin'

export interface template {
  (this: Framework, userOptions?: Options | boolean): Framework
}

/**
 * Template function options
 *
 * @public @config
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

/**
 * Enable and/or configure a generated HTML template
 *
 * @example
 *
 * ```ts
 * app.template()
 * ```
 *
 * With configuration defaults:
 *
 * ```ts
 * app.template({
 *   enabled: true,
 *   template: 'public/index.html',
 *   replace: {
 *     APP_NAME: name,
 *     APP_DESCRIPTION: description,
 *     PUBLIC_URL: app.env.get('PUBLIC_URL'),
 *   },
 * })
 * ```
 *
 * @public
 */
export const template: template = function (
  options?: Options | boolean,
): Framework {
  if (options === false) {
    this.store.set('html', false)
    return this
  }

  this.store.set('html', true)

  /**
   * Add {@link BudHtmlWebpackPlugin} if it isn't already added
   */
  !this.extensions.has('html-webpack-plugin') &&
    this.extensions.add(BudHtmlWebpackPlugin)

  /**
   * Add {@link BudInterpolateHtmlPlugin} if it isn't already added
   */
  !this.extensions.has('interpolate-html-plugin') &&
    this.extensions.add(BudInterpolateHtmlPlugin)

  if (isUndefined(options) || isBoolean(options)) return this

  this.extensions
    .get('html-webpack-plugin')
    .options.merge(options)

  if (!options.replace) return this

  this.extensions
    .get('interpolate-html-plugin')
    .options.merge(options.replace)

  return this
}
