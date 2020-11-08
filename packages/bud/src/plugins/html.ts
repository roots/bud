import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Extension} from '@roots/bud-typings'

export const options: HtmlWebpackPlugin.Options = ({fs}) => ({
  alwaysWriteToDisk: true,
  base: fs.baseDir,
  publicPath: '/',
  template: fs.path.join(
    fs.path.dirname(require.resolve('@roots/bud-support')),
    '/../publish/template.html',
  ),
})

export const make: Extension.Make = opts =>
  new HtmlWebpackPlugin(opts)

export const when: Extension.When = ({features}) => {
  return features.enabled('html')
}
