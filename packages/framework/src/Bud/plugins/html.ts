import HtmlWebpackPlugin from 'html-webpack-plugin'

export const options: HtmlWebpackPlugin.Options = ({fs}) => ({
  inject: true,

  template: fs.path.join(
    fs.path.dirname(require.resolve('@roots/bud-support')),
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
})

export const make: Adapter.make = opts =>
  new HtmlWebpackPlugin(opts)

export const when: Adapter.when = ({features}) => {
  return features.enabled('html')
}
