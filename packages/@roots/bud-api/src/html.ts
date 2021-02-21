import {Framework} from '@roots/bud-framework'

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
      options?: {
        template?: string
        replacements?: {[key: string]: any}
      },
    ) => Framework
  }
}

export const html: Framework.Api.Html = function (options?) {
  this.options.enable('html')

  options?.template &&
    this.extensions
      .get('html-webpack-plugin')
      .set('options.template', options.template)

  options?.replacements &&
    this.extensions
      .get('interpolate-html-plugin')
      .set('options.replacements', options.replacements)

  return this
}
