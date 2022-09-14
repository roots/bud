import type {Bud} from '@roots/bud-framework'
import {isUndefined, omit} from '@roots/bud-support/lodash-es'
import type {Options as HtmlOptions} from 'html-webpack-plugin'
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

import BudHtmlWebpackPlugin from './html-webpack-plugin.extension.js'
import BudInterpolateHtmlPlugin from './interpolate-html-plugin.extension.js'

export interface template {
  (userOptions?: Options | boolean): Promise<Bud>
}

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
    [key: string]: string
  }
}

export const template: template = async function (
  userOptions,
): Promise<Bud> {
  const app = this as Bud

  if (userOptions === false) {
    app.extensions.remove(`html-webpack-plugin`)
    app.extensions.remove(`interpolate-html-plugin`)
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

  await app.extensions.add(BudHtmlWebpackPlugin)
  app.extensions
    .get(`html-webpack-plugin`)
    .setOptions(omit(options, `replace`))

  await app.extensions.add(BudInterpolateHtmlPlugin)
  app.extensions.get(`interpolate-html-plugin`).setOptions(options.replace)

  return app
}
