import {sass} from './api'
export * as registerRules from './registerRules'
export * as registerItems from './registerItems'

/**
 * Register configuration object.
 */
export const api = {
  sass,
}

/**
 * Boot extension
 */
export const boot = (bud: Framework.Bud): void => {
  /**
   * Initialize configuration object.
   */
  bud.sass = bud.sass(bud).init()

  /**
   * Resolve sass and scss extensions
   */
  ;['sass', 'scss'].map(ext => {
    !bud.config.get('resolve.extensions').includes(ext) &&
      bud.config.merge('resolve.extensions', [`.${ext}`])
  })
}

/**
 * Register sass loader
 */
export const registerLoader = [
  'sass-loader',
  require.resolve('sass-loader'),
]
