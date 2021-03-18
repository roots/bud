import {Framework} from '@roots/bud-framework'
import {isBoolean} from 'lodash'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## html [💁 Fluent]
     *
     * Enable and/or configure a generated HTML template
     *
     * ### Usage
     *
     * ```js
     * app.html({
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
    html: Framework.Api.Html
  }

  namespace Framework.Api {
    export type Html = (options?: {
      /**
       * Enable HTML generation
       */
      enabled?: boolean

      /**
       * An HTML template to use. If none is supplied the
       * default from @roots/bud-support will be used.
       */
      template?: string

      /**
       * ### Replacements
       *
       * Template variable names are used as keys.
       * Each key is associated with a replacement value.
       */
      replace?: {[key: string]: any}
    }) => Framework
  }
}

export const html: Framework.Api.Html = function (options?) {
  if (!options) {
    this.store.enable('options.html.enabled')
    return
  }

  /**
   * Update the enabled status for the html plugin
   */
  isBoolean(options.enabled)
    ? this.store.set('options.html.enabled', options.enabled)
    : this.store.enable('options.html.enabled')

  /**
   * Apply any replacements in the interpolation plugin
   */
  options.replace &&
    this.publish(
      {
        'extension/interpolate-html-plugin/options': opts => ({
          ...opts,
          ...options.replace,
        }),
      },
      'api/html',
    )

  /**
   * Set the html-webpack-plugin template
   */
  options.template &&
    this.publish(
      {
        'extension/html-webpack-plugin/options/template': () =>
          options.template,
      },
      'api/html',
    )

  return this
}
