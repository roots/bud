import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const css = require.resolve('css-loader')
const file = require.resolve('file-loader')
const minicss = require.resolve(MiniCssExtractPlugin.loader)
const raw = require.resolve('raw-loader')
const resolve = require.resolve('resolve-url-loader')
const style = require.resolve('style-loader')
const url = require.resolve('url-loader')
const cache = require.resolve('cache-loader')
const thread = require.resolve('thread-loader')
const extractCssChunks = require.resolve(
  'extract-css-chunks-webpack-plugin',
)

export const loaders = {
  [`css-loader`]: css,
  [`file-loader`]: file,
  [`mini-css-loader`]: minicss,
  [`raw-loader`]: raw,
  [`resolve-url-loader`]: resolve,
  [`style-loader`]: style,
  [`url-loader`]: url,
  [`cache-loader`]: cache,
  [`thread-loader`]: thread,
  [`extract-css-loader`]: extractCssChunks,
}
