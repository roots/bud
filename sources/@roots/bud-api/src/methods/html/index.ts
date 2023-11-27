import type * as HTMLExtension from '@roots/bud-extensions/html-webpack-plugin'
import type * as InterpolateHTMLExtension from '@roots/bud-extensions/interpolate-html-webpack-plugin'
import type {Bud} from '@roots/bud-framework'

import {isAbsolute} from 'node:path'

import isBoolean from '@roots/bud-support/lodash/isBoolean'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isObject from '@roots/bud-support/lodash/isObject'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import omit from '@roots/bud-support/lodash/omit'

type Options = HTMLExtension.Options & {
  replace?: InterpolateHTMLExtension.Options
}

export type Parameters = [
  (((options?: Options) => Options) | boolean | Options | string)?,
]

export interface html {
  (...options: Parameters): Promise<Bud>
}

/**
 * Set HTML template
 */
export const html: html = async function (this: Bud, options = true) {
  const isEnabled = options !== false

  const html = this.extensions.get(
    `@roots/bud-extensions/html-webpack-plugin`,
  )
  html.enable(isEnabled)

  if (isBoolean(options)) return this

  if (isObject(options) && !isFunction(options)) {
    if (!isUndefined(options.template) && !isAbsolute(options.template))
      options.template = this.path(options.template)

    Object.entries(omit(options, `replace`)).forEach(([k, v]) =>
      html.set(k, v),
    )
  }

  if (isFunction(options)) {
    html.setOptions(options(html.options ?? {}))
    return this
  }

  if (isString(options)) {
    html.set(`template`, this.path(options))
  }

  const interpolate = this.extensions.get(
    `@roots/bud-extensions/interpolate-html-webpack-plugin`,
  )
  interpolate.enable(isEnabled)

  if (isObject(options) && isObject(options.replace)) {
    Object.entries(options.replace).forEach(
      (v: [string, RegExp | string]) => interpolate.set(...v),
    )
  }

  return this
}
