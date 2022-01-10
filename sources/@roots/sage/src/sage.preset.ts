import {Extension, Framework} from '@roots/bud-framework'

import eventAppClose from './hooks/event.app.close'
import {eventBuildMakeBeforeDevelopment} from './hooks/event.build.make.before.dev'
import {eventBuildMakeBeforeProduction} from './hooks/event.build.make.before.production'
import eventCompilerDone from './hooks/event.compiler.done'
/**
 * Development configuration
 *
 * @param app - bud instance
 */
const inDevelopment = (app: Framework) => {
  app.devtool()

  app.hooks
    /** Use full URL for development */
    .async('event.build.make.before', eventBuildMakeBeforeDevelopment)
    /** Write hmr.json after compilation */
    .hooks.async<'event.compiler.done'>(
      'event.compiler.done',
      eventCompilerDone(app),
    )
    /** rm hmr.json when app is closed */
    .hooks.on('event.app.close', eventAppClose(app))
}

/**
 * Production configuration
 *
 * @param app - bud instance
 */
const inProduction = (app: Framework) => {
  app.minimize().hash().runtime('single')

  app.hooks.async(
    'event.build.make.before',
    eventBuildMakeBeforeProduction,
  )
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
  register: async app => {
    app
      .alias({
        '@fonts': app.path('src', 'fonts'),
        '@images': app.path('src', 'images'),
        '@scripts': app.path('src', 'scripts'),
        '@styles': app.path('src', 'styles'),
      })
      .provide({$: ['jquery'], jQuery: ['jquery']})
      .when(app.isProduction, inProduction, inDevelopment)

    /**
     * Override output directory for svg assets
     */
    app.build.rules.svg.setGenerator(app => ({
      filename:
        app.store.is('features.hash', true) && app.isProduction
          ? `images/${app.store.get('hashFormat')}[ext]`
          : `images/${app.store.get('fileFormat')}[ext]`,
    }))
  },
}
