import {Extension, Framework} from '@roots/bud-framework'

import eventAppClose from './hooks/event.app.close'
import eventCompilerDone from './hooks/event.compiler.done'

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

  app.hooks
    .async<'event.compiler.done'>(
      'event.compiler.done',
      eventCompilerDone(app),
    )
    .hooks.on('event.app.close', eventAppClose(app))
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
