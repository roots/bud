import type * as HTMLExtension from '@roots/bud-extensions/html-webpack-plugin'
import type * as InterpolateHTMLExtension from '@roots/bud-extensions/interpolate-html-webpack-plugin'
import type {Bud} from '@roots/bud-framework'

type Options = HTMLExtension.Options & {
  replace?: InterpolateHTMLExtension.Options
}

export type Parameters = [(Options | boolean)?]

export interface html {
  (...options: Parameters): Promise<Bud>
}

/**
 * Set HTML template
 */
export const html: html = async function (this: Bud, options) {
  const {getHtmlPluginOptions, getInterpolatePluginOptions} = await import(
    `./helpers.js`
  )

  const enabled = options !== false

  this.extensions
    .get(`@roots/bud-extensions/html-webpack-plugin`)
    ?.setOptions(getHtmlPluginOptions(this, options))
    .enable(enabled)

  this.extensions
    .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
    ?.setOptions(getInterpolatePluginOptions(this, options))
    .enable(enabled)

  return this
}
