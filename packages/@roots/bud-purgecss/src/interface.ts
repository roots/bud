import '@roots/bud-postcss'
import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework {
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
    purge: Framework.Api.Purge
  }

  namespace Framework.Api {
    type Purge = (
      this: Framework,
      userOptions: PurgeCss.UserOptions,
    ) => Framework

    namespace PurgeCss {
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

      type ExtractorFunction<T = string> = (
        content: T,
      ) => string[]

      interface Extractors {
        extensions: string[]
        extractor: ExtractorFunction
      }
    }
  }
}
