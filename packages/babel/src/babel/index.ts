import * as presets from './presets/env'
import * as plugins from './plugins'

/**
 * Babel ident
 */
export const ident: Build.Item['ident'] = 'babel'

/**
 * Babel loader
 */
export const loader: Build.Item['loader'] = loaders =>
  loaders.get('babel')

/**
 * Babel options
 */
export const options: Build.Item['options'] = {
  presets: [...Object.values(presets)],
  plugins: [...Object.values(plugins)],
}
