import {dirname, join} from 'path'

export type Copy = {patterns: string[]}

const plugins = {
  clean: {},

  /**
   * Compression webpack plugin.
   */
  compression: {
    /**
     * Brotli compression
     */
    brotli: {
      filename: '[path].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    },
    /**
     * Gzip compression
     */
    gzip: {
      filename: '[path].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    },
  },

  /**
   * Copy webpack plugin.
   * @see bud.copy
   */
  copy: {
    patterns: [],
  },

  /**
   * HTML webpack plugin
   */
  html: {
    replacements: {},
    /**
     * This is a little hackish but this is just
     * initial state.. and it _does_ resolve.
     */
    template: join(
      dirname(require.resolve('@roots/bud-support')),
      '/../publish/template.html',
    ),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  },

  /**
   * Ignore emit options.
   */
  ignoreEmit: [
    /**
     * Prevent Webpack 4 from creating useless .css.js files
     * when an entrypoint includes only css assets.
     */
    /\.*\.css.?\.js/,

    /**
     * Stop users from owning themselves with a wholescale moment/locale import.
     * @see {@link https://git.io/JUaNq}
     */
    /^\.\/locale$/,
    /moment$/,
  ],

  /**
   * Terser options
   */
  terser: {
    terserOptions: {
      parse: {
        ecma: 8,
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
      },
      mangle: {
        safari10: true,
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true,
      },
    },
    cache: true,
    parallel: true,
  },
}

export {plugins as default}
