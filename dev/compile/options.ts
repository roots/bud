import {resolve} from 'path'

export const baseDir = resolve(__dirname, '../../')

export const nccOptions = {
  externals: [
    'css-loader',
    'csv-loader',
    'file-loader',
    'html-loader',
    'remark-loasder',
    'resolve-url-loader',
    'style-loader',
    'typescript',
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
  debugLog: false,
}
