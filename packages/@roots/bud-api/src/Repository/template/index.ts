import type {Framework} from '@roots/bud-framework'
import type {Options as HtmlOptions} from 'html-webpack-plugin'

import {isUndefined} from '../../services/lodash'
import {BudHtmlWebpackPlugin} from './BudHtmlWebpackPlugin'
import * as BudInterpolateHtmlPlugin from './BudInterpolateHtmlPlugin'

export interface template {
  (this: Framework, userOptions?: Options): Framework
}

/**
 * Template function options
 *
 * @public @config
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
 * @public @config
 */
export const template: template = function (
  userOptions?: Options,
): Framework {
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

  /**
   * Set {@link Framework.store.repository.html} to true if the {@link Options.enabled}
   * property was left unspecified.
   */
  this.store.set(
    'html',
    isUndefined(userOptions?.enabled) ||
      userOptions.enabled === true,
  )

  /**
   * If there were no {@link Options} specified, we're done.
   */
  if (!userOptions) return this

  /**
   * Remove the {@link Options.enabled} property
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
   * If there are no {@link Options.replace} specified, we're done.
   */
  if (!userOptions.replace) return this

  /**
   * Set {@link InterpolateHtmlPlugin.Options}
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
