import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const loaders = {
  [`css-loader`]: require.resolve('css-loader'),
  [`file-loader`]: require.resolve('file-loader'),
  [`mini-css-loader`]: MiniCssExtractPlugin.loader,
  [`raw-loader`]: require.resolve('raw-loader'),
  [`resolve-url-loader`]: require.resolve('resolve-url-loader'),
  [`style-loader`]: require.resolve('style-loader'),
  [`url-loader`]: require.resolve('url-loader'),
  [`cache-loader`]: require.resolve('cache-loader'),
  [`thread-loader`]: require.resolve('thread-loader'),
}
