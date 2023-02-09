import type * as BudBrotli from './brotli.js'
import type {Options} from './extension.js'
import type * as BudGzip from './gzip.js'

declare module '@roots/bud-framework/registry/flags' {
  interface Flags {
    gzip: boolean
    brotli: boolean
  }
}

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-compress': {
      brotli: Modules[`@roots/bud-compress/brotli`]
      gzip: Modules[`@roots/bud-compress/gzip`]
    }

    '@roots/bud-compress/brotli': {
      /**
       * Is brotli compression enabled?
       */
      enabled: BudBrotli.default[`enabled`]

      /**
       * Disable brotli compression.
       */
      disable: BudBrotli.default[`disable`]

      /**
       * Enable brotli compression.
       */
      enable: BudBrotli.default[`enable`]

      /**
       * Set compression options
       */
      setOptions: BudBrotli.default[`setOptions`]

      /**
       * Set compression options
       *
       * @example
       * ```js
       * bud.compress.gzip.set('filename', '[name].br[query]')
       * ```
       */
      set: BudBrotli.default[`set`]

      /**
       * @deprecated Use `bud.compress.brotli.setOptions()` instead.
       */
      config: BudBrotli.default[`config`]
    }

    '@roots/bud-compress/gzip': {
      /**
       * Is gzip compression enabled?
       */
      enabled: BudGzip.default[`enabled`]

      /**
       * Disable gzip compression.
       */
      disable: BudGzip.default[`disable`]

      /**
       * Enable gzip compression.
       */
      enable: BudGzip.default[`enable`]

      /**
       * Set compression options.
       */
      setOptions: BudGzip.default[`setOptions`]

      /**
       * Set compression options
       *
       * @example
       * ```js
       * bud.compress.gzip.set('filename', '[name].gz[query]')
       * ```
       */
      set: BudGzip.default[`set`]

      /**
       * @deprecated Use `bud.compress.gzip.setOptions()` instead.
       */
      config: BudGzip.default[`config`]
    }
  }

  interface Bud {
    /**
     * Compress static assets
     *
     * @example
     * ```js
     * bud.compress.gzip
     *  .enable()
     *  .set('filename', '[name].gz[query]')
     *
     * bud.compress.brotli
     *  .enable()
     *  .set('filename', '[name].br[query]')
     * ```
     */
    compress: Modules[`@roots/bud-compress`]

    /**
     * @deprecated Use `bud.compress.gzip` instead.
     */
    gzip(options?: Options): Bud

    /**
     * @deprecated Use `bud.compress.brotli` instead.
     */
    brotli(options?: Options): Bud
  }
}
