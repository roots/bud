import {isUndefined} from 'lodash'
import {Api} from '@roots/bud-framework'
import * as HtmlWebpackPlugin from './HtmlWebpackPlugin'
import * as InterpolateHtmlPlugin from './InterpolateHtmlPlugin'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## template [💁 Fluent]
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
    template: Api.Template
  }

  namespace Api {
    type Template = (
      this: Framework,
      options?: {
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
        replace?: {
          [key: string]: any
        }
      },
    ) => Framework
  }
}

const template: Api.Template = function (userOptions?) {
  !this.extensions.has('html-webpack-plugin') &&
    this.extensions.add(HtmlWebpackPlugin)

  !this.extensions.has('interpolate-html-plugin') &&
    this.extensions.add(InterpolateHtmlPlugin)

  this.store.set(
    'html',
    isUndefined(userOptions?.enabled) ||
      userOptions.enabled === true,
  )

  const {options, set} = this.extensions.get(
    'html-webpack-plugin',
  )

  userOptions &&
    set('options', () => ({
      ...options,
      ...Object.entries(userOptions)
        .filter(([k]) => k !== 'enabled')
        .reduce((a, [k, v]) => ({...a, [k]: v}), {}),
    }))

  return this
}

export {template}
