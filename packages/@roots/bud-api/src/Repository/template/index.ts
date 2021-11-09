import type {Framework} from '@roots/bud-framework'
import type {Options as HtmlOptions} from 'html-webpack-plugin'

import {BudHtmlWebpackPlugin} from './html-webpack-plugin.extension'
import {BudInterpolateHtmlPlugin} from './interpolate-html-plugin.extension'

export interface template {
  (userOptions?: Options | boolean): Framework
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
 * @public @config
 */
export const template: template = function (
  userOptions?: Options | boolean,
): Framework {
  const ctx = this as Framework

  /**
   * If there were no {@link Options} specified, we're done.
   */
  if (userOptions === false) {
    ctx.store.set('html', false)
    return ctx
  }
  ctx.store.set('html', true)

  /**
   * Add {@link BudHtmlWebpackPlugin} if it isn't already added
   */
  if (
    !ctx.extensions.has('html-webpack-plugin') &&
    !ctx.extensions.queue.some(
      extension => extension.name === 'html-webpack-plugin',
    )
  ) {
    ctx.info('enqueuing html-webpack-plugin')
    ctx.extensions.enqueue(BudHtmlWebpackPlugin)
  }

  /**
   * Add {@link BudInterpolateHtmlPlugin} if it isn't already added
   */
  if (
    !ctx.extensions.has('interpolate-html-plugin') &&
    !ctx.extensions.queue.some(
      extension => extension.name === 'interpolate-html-plugin',
    )
  ) {
    ctx.info('enqueuing bud-interpolate-html-plugin')
    ctx.extensions.enqueue(BudInterpolateHtmlPlugin)
  }

  /**
   * If there were no {@link Options} specified, we're done.
   */
  if (!userOptions || userOptions === true) return ctx

  ctx.info('processing html-webpack-plugin options')

  ctx.store.merge('extension.html-webpack-plugin', userOptions)

  if (!userOptions.replace) return ctx

  ctx.info('processing bud-interpolate-html-plugin options')

  ctx.store.merge(
    'extension.interpolate-html-plugin',
    userOptions.replace,
  )

  return ctx
}
