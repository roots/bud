import Bud from '@roots/bud-types'
import PurgeCssPlugin from '@fullhuman/postcss-purgecss'
import * as wp from 'purgecss-with-wordpress'

const plugin: Bud.Plugin.Factory = bud => ({
  bud,
  make: function () {
    this.bud.apply('purgecss', purgeUserConfig.bind(this))
  },
})

/**
 * ## bud.purge
 *
 * Purge unused CSS from compiled stylesheets
 *
 * @see https://purgecss.com/guides/wordpress.html
 * @see https://purgecss.com/configuration.html
 *
 * ```js
 * bud.purge({
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
const purgeUserConfig: Bud.Config.Fluent<UserOptions> = function (
  options: UserOptions,
) {
  this.build.loaders.postcss.options.plugins = [
    ...this.build.loaders.postcss.options.plugins,
    PurgeCssPlugin(options),
  ]

  return this
}

interface UserOptions {
  content?: Array<string | RawContent>
  contentFunction?: (
    sourceFile: string,
  ) => Array<string | RawContent>
  css: Array<string | RawCSS>
  defaultExtractor?: ExtractorFunction
  extractors?: Array<Extractors>
  fontFace?: boolean
  keyframes?: boolean
  output?: string
  rejected?: boolean
  stdin?: boolean
  stdout?: boolean
  variables?: boolean
  whitelist?: string[]
  whitelistPatterns?: Array<RegExp>
  whitelistPatternsChildren?: Array<RegExp>
}

interface RawContent<T = string> {
  extension: string
  raw: T
}

interface RawCSS {
  raw: string
}

type ExtractorFunction<T = string> = (content: T) => string[]
interface Extractors {
  extensions: string[]
  extractor: ExtractorFunction
}

const preset = {wp}
export {plugin, preset}
module.exports = {plugin, preset}
