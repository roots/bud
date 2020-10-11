/**
 * Sass ident
 */
export const ident: Build.Item['ident'] = 'sass'

/**
 * Sass loader
 */
export const loader: Build.Item['loader'] = loaders =>
  loaders.get('sass-loader')

let implementation: unknown
try {
  implementation = require('sass')
} catch {
  implementation = require('node-sass')
}

/**
 * Sass options
 */
export const options: Build.Item['options'] = {
  implementation,
}
