/**
 * ncc configuration base options
 *
 * @see `sources/@repo/compile-kit`
 */
export default {
  packages: [`@roots/bud-support`],
  options: {
    externals: [
      `css-loader`,
      `csv-loader`,
      `file-loader`,
      `html-loader`,
      `remark-loader`,
      `resolve-url-loader`,
      `style-loader`,
      `url-loader`,
      `xml-loader`,
      `ts-node`,
      `typescript`,
      `uglify-js`,
      `webpack`,
      `@roots/bud-framework`,
      `@roots/bud-support`,
    ],
    cache: false,
    minify: false,
    sourceMap: false,
    sourceMapRegister: false,
    watch: false,
    v8cache: false,
    debugLog: false,
  },
}
