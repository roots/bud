import {Framework} from '@roots/bud-framework'
import {isBoolean, isUndefined} from 'lodash'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## html  [💁 Fluent]
     *
     * Enable and/or configure a generated HTML template
     *
     * ### Usage
     *
     * ```js
     * app.html({
     *   template: app.project('public/index.html'),
     *   replacements: {
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
      this: Framework,
      options?:
        | {
            template?: string
            replacements?: {[key: string]: any}
          }
        | boolean,
    ) => Framework
  }
}

export const html: Framework.Api.Html = function (options?) {
  if (isUndefined(options)) {
    this.store.set('options.html.enabled', true)
    return this
  }

  if (isBoolean(options)) {
    this.store.set('options.html.enabled', options)
    return this
  }

  options.template &&
    this.store.set('options.html.template', options.template)

  this.store.set('options.html.enabled', true)

  const {template, replacements} = options as {
    template?: string
    replacements?: {[key: string]: any}
  }

  template &&
    this.hooks.on('html-webpack-plugin.template', () => template)

  replacements &&
    this.extensions.set(
      'interpolate-html-plugin.options',
      replacements,
    )

  return this
}
