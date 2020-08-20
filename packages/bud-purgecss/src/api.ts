import type {Bud} from '@roots/bud'
import purgecss from '@fullhuman/postcss-purgecss'
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

type PurgeCssOptions = {
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

type BudPurgeOptions = {
  enabled: boolean
  options: PurgeCssOptions
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
 *   enabled: bud.inProduction,
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
const config = function (this: Bud, options: BudPurgeOptions): Bud {
  this.options.set('postCss', {
    ...this.options.get('postCss'),
    plugins: [
      ...this.options.get('postCss').plugins,
      purgecss(options.options),
    ],
  })

  return this
}

export = config
