import {Framework} from '@roots/bud-framework'
import {isBoolean, isUndefined} from 'lodash'

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
     *   template: app.project('public/index.html'),
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
    export type Html = (
      options?:
        | {
            template?: string
            replace?: {[key: string]: any}
          }
        | boolean,
    ) => Framework
  }
}

export const html: Framework.Api.Html = function (options?) {
  /**
   * If noting specified or a boolean specified,
   * we're done.
   */
  this.when(
    isUndefined(options) || isBoolean(options),
    () => {
      /**
       * Update the enabled status for the html plugin
       */
      this.store.set(
        'options.html.enabled',
        isBoolean(options) ? options : true,
      )
    },
    () => {
      /**
       * Destructure keyed options
       */
      const {replace, template} = options as {
        template?: string
        replace?: {[key: string]: any}
      }

      /**
       * Apply any replacements in the interpolation plugin
       */
      replace &&
        this.publish(
          {
            'extension/interpolate-html-plugin/options': opts => ({
              ...opts,
              replacements: replace,
            }),
          },
          'api/html',
        )

      /**
       * Set the html-webpack-plugin template
       */
      template &&
        this.publish(
          {
            'extension/html-webpack-plugin/options': opts => ({
              ...opts,
              template,
            }),
          },
          'api/html',
        )
    },
  )

  return this
}
