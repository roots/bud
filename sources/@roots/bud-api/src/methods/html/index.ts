import type {Bud} from '@roots/bud-framework'
import {isUndefined, omit} from '@roots/bud-support/lodash-es'
import type {Options as HtmlOptions} from 'html-webpack-plugin'
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

/**
 * HTML options
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

export type Parameters = [(Options | boolean)?]

export interface html {
  (...userOptions: Parameters): Promise<Bud>
}

/**
 * Set HTML html
 *
 * @public
 */
export const html: html = async function (
  this: Bud,
  userOptions,
): Promise<Bud> {
  if (userOptions === false) {
    this.extensions
      .get(`@roots/bud-extensions/html-webpack-plugin`)
      ?.disable()

    this.extensions
      .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
      ?.disable()

    return this
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
    replace: this.env.getPublicEnv(),
  }

  if (!isUndefined(userOptions) && userOptions !== true) {
    options = {
      ...options,
      ...userOptions,
      replace: {
        ...(options.replace ?? {}),
        ...userOptions.replace,
      },
    }
  }

  this.extensions
    .get(`@roots/bud-extensions/html-webpack-plugin`)
    .setOptions(omit(options, `replace`))
    .enable()

  if (options.replace)
    this.extensions
      .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
      .setOptions(options.replace)
      .enable()

  return this
}
