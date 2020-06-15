import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {projectPath} from './util'

const babel = {
  test: /\.(js|jsx)$/,
  include: projectPath('src'),
  exclude: /node_modules/,
  loader: 'babel-loader',
}

const eslint = {
  test: /\.(js|jsx)$/,
  include: projectPath('src'),
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    formatter: 'json',
  },
}

/**
 * Webpack loaders
 */
const loaders = {
  module: {
    strictExportPresence: true,
    rules: [
      eslint,
      babel,
      {
        test: /\.css$/,
        include: projectPath('src'),
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader'},
          {loader: 'postcss-loader'},
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          'url-loader',
        ],
      },
    ],
  },
}

export default loaders
