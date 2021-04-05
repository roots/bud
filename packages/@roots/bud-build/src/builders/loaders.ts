import {Framework} from '@roots/bud-framework'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * Item hooks
 */
export function loaders(this: Framework): void {
  /**
   * loaders
   */
  this.publish({
    'loader/css': () => require.resolve('css-loader'),
    'loader/file': () => require.resolve('file-loader'),
    'loader/raw': () => require.resolve('raw-loader'),
    'loader/minicss': () => MiniCssExtractPlugin.loader,
    'loader/url': () => require.resolve('url-loader'),
    'loader/resolve-url': () =>
      require.resolve('resolve-url-loader'),
    'loader/style': () => require.resolve('style-loader'),
  })
}
