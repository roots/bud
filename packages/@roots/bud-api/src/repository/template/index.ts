import type {Framework} from '@roots/bud-framework'
import type {Options as HtmlOptions} from 'html-webpack-plugin'
import {isUndefined} from 'lodash'

import * as BudHtmlWebpackPlugin from './BudHtmlWebpackPlugin'
import * as BudInterpolateHtmlPlugin from './BudInterpolateHtmlPlugin'

/**
 * Enable and/or configure a generated HTML template
 *
 * @example
 * ```js
 * app.template({
 *   enabled: true, // default: true
 *   template: 'public/index.html',
 *   replace: {
 *     APP_NAME: name,
 *     APP_DESCRIPTION: description,
 *     PUBLIC_URL: app.env.get('PUBLIC_URL'),
 *   },
 * })
 * ```
 */
interface template {
  (this: Framework, userOptions?: Options): Framework
}

/**
 * Template options
 */
interface Options extends HtmlOptions {
  /**
   * Explicitly enable or disable html templating.
   */
  enabled?: boolean

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

const template: template = function (userOptions) {
  /**
   * Add the html-webpack-plugin extension if it isn't already added
   */
  !this.extensions.has('html-webpack-plugin') &&
    this.extensions.add(BudHtmlWebpackPlugin)

  /**
   * Add the interpolate-html-plugin extension if it isn't already added
   */
  !this.extensions.has('interpolate-html-plugin') &&
    this.extensions.add(BudInterpolateHtmlPlugin)

  /**
   * Set feature flag to true
   */
  this.store.set(
    'html',
    isUndefined(userOptions?.enabled) ||
      userOptions.enabled === true,
  )

  /**
   * If there were no options specified, we're done.
   */
  if (!userOptions) return this

  /**
   * Remove the `enabled` property from the {@link Options template options}
   */
  Object.assign(userOptions, {
    ...userOptions,
    enabled: undefined,
  })

  /**
   * Set {@link HtmlOptions}
   */
  const htmlPlugin = this.extensions.get('html-webpack-plugin')
  htmlPlugin.set('options', {
    ...htmlPlugin.options,
    ...userOptions,
  })

  /**
   * If there are no template vars specified, we're done
   */
  if (!userOptions.replace) return this

  /**
   * Set interpolate-html-plugin options
   */
  const interpolatePlugin = this.extensions.get(
    'interpolate-html-plugin',
  )

  interpolatePlugin.set('options', {
    ...interpolatePlugin.options,
    ...userOptions.replace,
  })

  return this
}

export {template}
