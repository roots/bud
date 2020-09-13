import bud from './bud'
import {loaders} from './loaders'

import {Bud} from '@roots/bud-types'

/**
 * Set projectPath form args.
 *
 * This is used by filesystem setup so we do it early.
 */
if (bud.args.has('project')) {
  bud.paths.set(
    'project',
    bud.fs.resolve(process.cwd(), bud.args.get('project')),
  )
}

/**
 * Setup filesystem.
 */
bud.fs.refresh = () => {
  bud.fs.setBase(bud.paths.get('project'))

  bud.fs.setDisk([
    bud.fs.resolve(bud.fs.base, '**/*'),
    bud.fs.resolve(bud.fs.base, '*'),
    `!${bud.fs.resolve(bud.fs.base, 'node_modules/**/*')}`,
    `!${bud.fs.resolve(bud.fs.base, 'vendor/**/*')}`,
  ])
}

/**
 * Set filesystem best we can
 */
bud.fs.setBase(bud.paths.get('project') || bud.fs.cwd)
bud.fs.refresh()

/**
 * Set CI mode from args if available --
 *
 * Enabling CI flags for @roots/bud-cli that rawmode is not supported.
 */
if (bud.args.get('ci')) {
  bud.features.enable('ci')
}

/**
 * Set mode from args if available
 */
if (bud.args.get('env')) {
  bud.mode.set(bud.args.get('env'))
}

/**
 * Enable dev if mode is set
 */
bud.mode.is('development') && bud.features.enable('dev')

/**
 * Set hot from args
 */
if (bud.args.get('hot')) {
  bud.features.enable('hot')
}

/**
 * Set src from args
 */
if (bud.args.get('src')) {
  bud.paths.set(
    'src',
    bud.fs.resolve(
      bud.paths.get('project'),
      bud.args.get('src'),
    ),
  )
}

/**
 * Set dist from args
 */
if (bud.args.get('dist')) {
  bud.paths.set(
    'dist',
    bud.fs.resolve(
      bud.paths.get('project'),
      bud.args.get('dist'),
    ),
  )
}

/**
 * Set devtool from args
 */
if (bud.args.get('devtool')) {
  bud.options.set('webpack.devtool', bud.args.get('devtool'))
}

/**
 * Set gzip from args
 */
if (bud.args.get('gzip')) {
  bud.features.set('gzip', bud.args.get('gzip'))
}

/**
 * Set brotli from args
 */
if (bud.args.get('brotli')) {
  bud.features.set('brotli', bud.args.get('brotli'))
}

/**
 * Setup loaders
 */
bud.loaders = new bud.container(loaders(bud))

/**
 * Set babel config
 */
bud.fs.has('babel.config.js') &&
  bud.loaders.set(
    'babel.options',
    bud.fs.read('babel.config.js'),
  )

/**
 * Get postcss config
 */
bud.fs.has('postcss.config.js') &&
  bud.loaders.set(
    'postcss.options',
    bud.fs.read('postcss.config.js'),
  )

/**
 * Bud - Webpack build framework
 */
module.exports = bud

export type {Bud}
