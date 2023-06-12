import type * as HTMLExtension from '@roots/bud-extensions/html-webpack-plugin'
import type * as InterpolateHTMLExtension from '@roots/bud-extensions/interpolate-html-webpack-plugin'
import type {Bud} from '@roots/bud-framework'

import isObject from '@roots/bud-support/lodash/isObject'

type Options = HTMLExtension.Options & {
  replace?: InterpolateHTMLExtension.Options
}

export type Parameters = [(boolean | Options)?]

export interface html {
  (...options: Parameters): Promise<Bud>
}

/**
 * Set HTML template
 */
export const html: html = async function (this: Bud, options) {
  const {getHtmlPluginOptions} = await import(`./helpers.js`)

  const enabled = options !== false

  const htmlExtension = this.extensions.get(
    `@roots/bud-extensions/html-webpack-plugin`,
  )
  htmlExtension.enable(enabled)

  const htmlOptions = getHtmlPluginOptions(this, options)
  if (isObject(htmlOptions)) {
    Object.entries(htmlOptions).forEach(v => htmlExtension.set(...v))
  }

  const interpolateVariablesExtension = this.extensions.get(
    `@roots/bud-extensions/interpolate-html-webpack-plugin`,
  )
  interpolateVariablesExtension.enable(enabled)

  if (isObject(options) && isObject(options.replace)) {
    Object.entries(options.replace).forEach(
      (v: [string, RegExp | string]) =>
        interpolateVariablesExtension.set(...v),
    )
  }

  return this
}
