import {dirname, join} from 'path'

export type Copy = {patterns: any[]}

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
     * @see https://github.com/facebook/create-react-app/blob/52449c34eedc53e50a2a159d38604ea7df5bd997/packages/react-scripts/config/webpack.config.prod.js#L463-L467
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
