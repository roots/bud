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
export const boot = (instance: Framework.Bud): void => {
  /**
   * Initialize configuration object.
   */
  instance.sass = instance.sass(instance).init()

  /**
   * Resolve sass and scss extensions
   */
  ;['sass', 'scss'].map(ext => {
    !instance.build.config
      .get('resolve.extensions')
      .includes(ext) &&
      instance.build.config.merge('resolve.extensions', [
        `.${ext}`,
      ])
  })
}

/**
 * Register sass loader
 */
export const registerLoader = [
  'sass-loader',
  require.resolve('sass-loader'),
]
