const test = require('ava')
const {bud} = require('@roots/bud')
const {join, resolve} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

test('has expected defaults', t => {
  t.deepEqual(bud.loaders.repository, {
    babel: require.resolve('babel-loader'),
    css: require.resolve('css-loader'),
    file: require.resolve('file-loader'),
    miniCss: MiniCssExtractPlugin.loader,
    postCss: require.resolve('postcss-loader'),
    resolveUrl: require.resolve('resolve-url-loader'),
    style: require.resolve('style-loader'),
    svgr: require.resolve('@svgr/webpack'),
    url: require.resolve('url-loader'),
  })
})
