import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const css = require.resolve('css-loader')
export const file = require.resolve('file-loader')
export const minicss = MiniCssExtractPlugin.loader
export const raw = require.resolve('raw-loader')
export const resolveUrl = require.resolve('resolve-url-loader')
export const style = require.resolve('style-loader')
export const url = require.resolve('url-loader')
