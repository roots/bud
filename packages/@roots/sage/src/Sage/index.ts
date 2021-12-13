import {Extension, Framework} from '@roots/bud-framework'

/**
 * Development configuration
 *
 * @param app - bud instance
 */
const inDevelopment = (app: Framework) => {
  app.devtool()

  app.extensions.get('@roots/bud-entrypoints').setOptions({
    publicPath: 'auto',
  })
}

/**
 * Production configuration
 *
 * @param app - bud instance
 */
const inProduction = (app: Framework) => {
  app.minimize().hash().runtime('single')
}

/**
 * Sage preset
 *
 * @public
 */
export const Sage: Extension.Module = {
  /**
   * Extension identifier
   *
   * @public
   */
  name: '@roots/sage',

  /**
   * Extension boot
   *
   * @public
   */
  register: async (app, logger) => {
    app
      .alias({
        '@fonts': app.path('src', 'fonts'),
        '@images': app.path('src', 'images'),
        '@scripts': app.path('src', 'scripts'),
        '@styles': app.path('src', 'styles'),
      })
      .provide({$: ['jquery'], jQuery: ['jquery']})

      .when(app.isProduction, inProduction, inDevelopment)
  },
}
