/**
 * Sass ident
 */
export const ident: Build.Item['ident'] = 'sass'

export const loader: Build.Item['loader'] = 'sass'

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
