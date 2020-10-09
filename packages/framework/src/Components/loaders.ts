import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const loaders = (
  bud: Framework.Bud,
): Framework.Index<string> => {
  return bud.hooks.filter('components.loaders', {
    ['babel-loader']: require.resolve('babel-loader'),
    ['css-loader']: require.resolve('css-loader'),
    ['file-loader']: require.resolve('file-loader'),
    ['minicss-loader']: MiniCssExtractPlugin.loader,
    ['raw-loader']: require.resolve('raw-loader'),
    ['resolve-url-loader']: require.resolve(
      'resolve-url-loader',
    ),
    ['style-loader']: require.resolve('style-loader'),
    ['url-loader']: require.resolve('url-loader'),
  })
}

export {loaders as default}
