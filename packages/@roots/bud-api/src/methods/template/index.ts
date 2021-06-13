import {isBoolean} from 'lodash'
import {Api, Rule} from '@roots/bud-framework'
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
        replace?: {[key: string]: any}
      },
    ) => Framework
  }
}

const template: Api.Template = function (options?) {
  if (!options || options?.enabled) {
    this.hooks.on(
      'build/module/rules',
      (rules: {[key: string]: Rule}) => {
        if (rules.html) delete rules.html

        return rules
      },
    )
  }

  /**
   * No options? enable
   * this functionality and return early.
   */
  if (!options) {
    this.store.set('html', true)
    return this
  }

  /**
   * Update the enabled status
   * for the html plugin
   */
  isBoolean(options.enabled)
    ? this.store.set('html', options.enabled)
    : this.store.set('html', true)

  /**
   * If the plugin was disabled explicitly we're done.
   */
  if (options?.enabled == false) {
    return this
  }

  /**
   * Register extensions if not already registered
   */
  !this.extensions.has('html-webpack-plugin') &&
    this.extensions.add(HtmlWebpackPlugin)

  !this.extensions.has('interpolate-html-plugin') &&
    this.extensions.add(InterpolateHtmlPlugin)

  /**
   * Apply any replacements
   * with the interpolation plugin
   */
  options.replace &&
    this.extensions
      .get('html-webpack-plugin')
      .set('options', value => ({
        ...value,
        ...options.replace,
      }))

  /**
   * Set the template
   */
  options.template &&
    this.extensions
      .get('html-webpack-plugin')
      .set('options', value => ({
        ...value,
        template: options.template,
      }))

  return this
}

export {template}
