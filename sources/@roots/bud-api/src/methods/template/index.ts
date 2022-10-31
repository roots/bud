import type {Bud} from '@roots/bud-framework'
import {isUndefined, omit} from '@roots/bud-support/lodash-es'
import type {Options as HtmlOptions} from 'html-webpack-plugin'
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

/**
 * Set HTML template
 *
 * @public
 */
interface template {
  (userOptions?: Options | boolean): Promise<Bud>
}

/**
 * Set HTML template (facade)
 *
 * @public
 */
export interface facade {
  (userOptions?: Options | boolean): Bud
}

/**
 * Template function options
 *
 * @public
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
    [key: string]: RegExp | string
  }
}

/**
 * Set HTML template
 *
 * @public
 */
export const template: template = async function (
  userOptions,
): Promise<Bud> {
  const app = this as Bud

  if (userOptions === false) {
    app.extensions
      .get(`@roots/bud-extensions/html-webpack-plugin`)
      .disable()
    app.extensions
      .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
      .disable()

    return app
  }

  let options: Options = {
    template: resolve(
      dirname(fileURLToPath(import.meta.url)),
      `..`,
      `..`,
      `..`,
      `vendor`,
      `template.html`,
    ),
    replace: app.env.getPublicEnv(),
  }

  if (!isUndefined(userOptions) && userOptions !== true) {
    options = {
      ...options,
      ...userOptions,
      replace: {
        ...options.replace,
        ...userOptions.replace,
      },
    }
  }

  app.extensions
    .get(`@roots/bud-extensions/html-webpack-plugin`)
    .setOptions(omit(options, `replace`))
    .enable()

  app.extensions
    .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
    .setOptions(options.replace)
    .enable()

  return app
}
