import type {Bud} from '@roots/bud-framework'
import type * as HTMLWebpackPlugin from '@roots/bud-support/html-webpack-plugin'

import type * as InterpolateHTMLExtension from './interpolate-html-webpack-plugin/index.js'

export type Parameters = [
  (HTMLWebpackPlugin.Options &
    InterpolateHTMLExtension.Options & {filename?: string})?,
]

export interface html {
  (...options: Parameters): Promise<Bud>
}

/**
 * Set HTML template
 */
export const html: html = async function (this: Bud, options) {
  const helpers = await import(`./helpers.js`)

  const {Plugin} = await import(`@roots/bud-support/html-webpack-plugin`)
  const {InterpolateHtmlWebpackPlugin} = await import(
    `./interpolate-html-webpack-plugin/index.js`
  )

  const htmlPlugin = new Plugin(
    helpers.getHtmlPluginOptions(this, options),
  )
  const interpolatePlugin = new InterpolateHtmlWebpackPlugin(
    Plugin.getHooks,
    helpers.getInterpolatePluginOptions(this, options),
  )

  this.hooks.async(`build.plugins`, async (plugins = []) => {
    plugins.push(htmlPlugin, interpolatePlugin)
    return plugins
  })

  return this
}
