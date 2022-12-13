import type {Bud} from '@roots/bud-framework'
import {isObject, isUndefined, omit} from '@roots/bud-support/lodash-es'
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
  (...options: Parameters): Promise<Bud>
}

/**
 * Set HTML html
 *
 * @public
 */
export const html: html = async function (
  this: Bud,
  options,
): Promise<Bud> {
  this.extensions
    .get(`@roots/bud-extensions/html-webpack-plugin`)
    ?.enable(options !== false)
  this.extensions
    .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
    ?.enable(options !== false)

  if (options === false) return this

  this.extensions
    .get(`@roots/bud-extensions/html-webpack-plugin`)
    .setOptions({
      template: resolve(
        dirname(fileURLToPath(import.meta.url)),
        `..`,
        `..`,
        `..`,
        `vendor`,
        `template.html`,
      ),
      ...omit(isObject(options) ? options : {} ?? {}, `replace`),
    })

  if (isObject(options) && !isUndefined(options.replace)) {
    this.extensions
      .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
      .setOptions(options.replace)
  }

  return this
}
