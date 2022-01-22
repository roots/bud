import {Extension} from '@roots/bud-framework'

import eventAppClose from './hooks/event.app.close'
import eventCompilerDone from './hooks/event.compiler.done'
import {setPublicPath} from './setPublicPath'

/**
 * Image filename utility
 *
 * @remarks
 * Given a string, will return it as a webpack filename
 * in the `images/` directory
 *
 * @param name - filename
 * @returns filename
 *
 * @internal
 */
const makeImageFilename = (name: string) => `images/${name}/[ext]`

/**
 * Sage preset
 *
 * @public
 */
export const Sage: Extension.Module<void> = {
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
  boot: async app => {
    /**
     * setPublicPath
     *
     * @deprecated Please remove this function from your config file. It is not needed.
     * @returns Framework
     *
     * @public
     */
    app.setPublicPath = setPublicPath.bind(this)

    /**
     * Override output directory for svg assets
     * `@roots/bud-build` places them, by default, in `svg/`
     */
    app.build.rules.svg.setGenerator(app => ({
      filename:
        app.store.is('features.hash', true) && app.isProduction
          ? makeImageFilename(app.store.get('hashFormat'))
          : makeImageFilename(app.store.get('fileFormat')),
    }))

    /**
     * Directory aliases
     */
    app.alias({
      '@fonts': app.path('src', 'fonts'),
      '@images': app.path('src', 'images'),
      '@scripts': app.path('src', 'scripts'),
      '@styles': app.path('src', 'styles'),
    })

    /**
     * Separate vendor code from application
     */
    app.splitChunks()

    /**
     * Production/development configuration
     */
    app.when(
      /**
       * Test for production
       */
      app.isProduction,

      /**
       * Production
       */
      () => app.minimize().hash().runtime('single'),

      /**
       * Development
       */
      ({devtool, hooks}) => {
        devtool()

        hooks.async('event.compiler.done', eventCompilerDone.bind(app))
        hooks.on('event.app.close', eventAppClose.bind(app))
      },
    )
  },
}
