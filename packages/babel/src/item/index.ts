import {env} from './preset'

import {
  dynamicImport,
  objectRestSpread,
  transformRuntime,
} from './plugins'

/**
 * Babel ident
 */
export const ident: Build.Item['ident'] = 'babel'

/**
 * Babel loader
 */
export const loader: Build.Item['loader'] = loaders =>
  loaders.get('babel-loader')

/**
 * Babel options
 */
export const options: Build.Item['options'] = {
  presets: [env],
  plugins: [dynamicImport, objectRestSpread, transformRuntime],
}
