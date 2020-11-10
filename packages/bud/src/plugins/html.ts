import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Extension} from '@roots/bud-extensions'

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
  new HtmlWebpackPlugin(opts.all())

export const when: Extension.When = ({features}) =>
  features.enabled('html')
