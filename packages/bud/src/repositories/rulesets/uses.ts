import {Bud} from '../..'
import type {RuleSetRule} from 'webpack'

/**
 * Module Rule
 */
type Use = (bud: Bud) => RuleSetRule
interface UsesHash {
  [key: string]: Use
}

const uses: UsesHash = {
  babel: (bud: Bud) => ({
    loader: bud.loaders.get('babel'),
    options: {
      cacheDirectory: true,
      cacheCompression: bud.inProduction,
      ...bud.options.get('babel'),
    },
  }),
  file: (bud: Bud) => ({
    loader: bud.loaders.get('file'),
    options: {
      name: '[path][name].[ext]',
    },
  }),
  miniCss: (bud: Bud) => ({
    loader: bud.loaders.get('miniCss'),
    options: {
      hot: bud.features.enabled('hot'),
    },
  }),
  css: (bud: Bud) => ({
    loader: bud.loaders.get('css'),
  }),
  resolveUrl: (bud: Bud) => ({
    loader: bud.loaders.get('resolveUrl'),
    options: {
      sourceMap: bud.features.enabled('sourceMap'),
      debug: true,
    },
  }),
  postCss: (bud: Bud) => ({
    loader: bud.loaders.get('postCss'),
    options: {
      ident: 'postcss',
      ...bud.options.get('postCss'),
    },
  }),
  style: (bud: Bud) => ({
    loader: bud.loaders.get('style'),
  }),
}

export {uses}
export {Use, UsesHash}
