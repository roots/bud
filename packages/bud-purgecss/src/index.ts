import {BudInterface, Plugin} from '@roots/bud'
import * as wp from 'purgecss-with-wordpress'

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

const plugin: Plugin = (bud: BudInterface) => ({
  bud,

  make: function () {
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
    this.bud.apply('purgecss', function (
      options: UserDefinedOptions,
    ) {
      this.loaders.set('postcss.options.plugins', [
        ...this.loaders.get('postcss.options.plugins'),
        PurgeCssPlugin(options),
      ])

      return this
    })
  },
})

const preset = {wp}
export {plugin, preset}
