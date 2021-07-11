import {isUndefined} from 'lodash'

import * as HtmlWebpackPlugin from './HtmlWebpackPlugin'
import * as InterpolateHtmlPlugin from './InterpolateHtmlPlugin'

import type {Options as HtmlOptions} from 'html-webpack-plugin'
import type {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## template
     *
     * Enable and/or configure a generated HTML template
     *
     * ### Usage
     *
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
    template: Framework.Api.Template
  }

  namespace Framework.Api {
    type Template = (
      this: Framework,
      options?: Options,
    ) => Framework

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
  }
}

const template: Framework.Api.Template = function (userOptions) {
  /**
   * Add the html-webpack-plugin extension if it isn't already added
   */
  !this.extensions.has('html-webpack-plugin') &&
    this.extensions.add(HtmlWebpackPlugin)

  /**
   * Add the interpolate-html-plugin extension if it isn't already added
   */
  !this.extensions.has('interpolate-html-plugin') &&
    this.extensions.add(InterpolateHtmlPlugin)

  /**
   * Set feature flag to true
   */
  this.store.set(
    'html',
    isUndefined(userOptions?.enabled) ||
      userOptions.enabled === true,
  )

  /**
   * This isn't an option for either html-webpack-plugin or interpolate-html-plugin
   * so we'll just delete it.
   */
  !isUndefined(userOptions?.enabled) &&
    delete userOptions.enabled

  /**
   * If there were no options specified, we're done.
   */
  if (!userOptions) return this

  /**
   * Set html-webpack-plugin options
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
