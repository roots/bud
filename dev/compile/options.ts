import {resolve} from 'path'

export const baseDir = resolve(__dirname, '../../')

export const nccOptions = {
  externals: [
    'css-loader',
    'csv-loader',
    'file-loader',
    'html-loader',
    'remark-loader',
    'resolve-url-loader',
    'style-loader',
    'uglify-js',
    'webpack',
    'url-loader',
    'xml-loader',
    '@roots/bud-framework',
    '@roots/bud-support',
  ],
  cache: false,
  minify: false,
  sourceMap: false,
  sourceMapRegister: false,
  watch: false,
  v8cache: false,
  quiet: true,
  debugLog: false,
}
