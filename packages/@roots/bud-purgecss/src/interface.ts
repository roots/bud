import '@roots/bud-extensions'
import '@roots/bud-postcss'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-purgecss': Module
    }
  }

  interface Framework {
    /**
     * ## purge
     *
     * Purge unused CSS from compiled stylesheets
     *
     * @see https://purgecss.com/configuration.html
     *
     * ```js
     * app.purge({
     *   content: [app.path('project', 'resources/views/**')],
     *   allow: require('purgecss-with-wordpress').whitelist,
     *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
     * })
     * ```
     */
    purge: PurgeCss.Config
  }

  export namespace PurgeCss {
    export type Config = (
      userOptions: PurgeCss.UserOptions,
    ) => Framework

    export interface UserOptions {
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

    export interface RawContent<T = string> {
      extension: string
      raw: T
    }

    export interface RawCSS {
      raw: string
    }

    export type ExtractorFunction<T = string> = (
      content: T,
    ) => string[]

    export interface Extractors {
      extensions: string[]
      extractor: ExtractorFunction
    }
  }
}
