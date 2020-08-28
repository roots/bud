import {Plugin} from '@roots/bud-framework'
import * as purgeWordPress from 'purgecss-with-wordpress'

import PurgeCssPlugin from '@fullhuman/postcss-purgecss'

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

interface UserDefinedOptions {
  content?: Array<string | RawContent>
  contentFunction?: (sourceFile: string) => Array<string | RawContent>
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
const purgecss: Plugin = () => ({
  make: function () {
    this.bud.apply('purgecss', function (
      options: UserDefinedOptions,
    ) {
      this.options.push('postcss.plugins', [
        ...this.options.get('postcss.plugins'),
        PurgeCssPlugin(options),
      ])

      return this
    })
  },
})

export {purgecss, purgeWordPress}
