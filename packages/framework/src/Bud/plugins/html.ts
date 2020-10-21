import HtmlWebpackPlugin from 'html-webpack-plugin'

export const options: HtmlWebpackPlugin.Options = ({
  fs,
  disk,
}) => ({
  alwaysWriteToDisk: true,
  base: fs.baseDir,
  publicPath: '/',
  template: fs.path.join(
    fs.path.dirname(require.resolve('@roots/bud-support')),
    '/../publish/template.html',
  ),
})

export const make: Framework.Extension.Make = opts =>
  new HtmlWebpackPlugin(opts)

export const when: Framework.Extension.When = ({features}) => {
  return features.enabled('html')
}
