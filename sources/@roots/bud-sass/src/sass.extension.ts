import type {Extension, Framework} from '@roots/bud-framework'
import type {Signale} from '@roots/bud-support'

import * as postcss from './sass.postcss'
import * as webpack from './sass.webpack'

export interface extension extends Extension.Module {}

/**
 * Adds scss and postcss-scss support to Bud
 *
 * @public
 */
export const extension: extension = {
  /**
   * Extension identifier
   *
   * @public
   */
  name: '@roots/bud-sass',

  /**
   * Extension registration callback
   *
   * @param app - Bud instance
   * @param logger - Bud logger
   *
   * @public
   */
  async register(app: Framework, logger: Signale) {
    // add webpack loaders and rules
    app.build.loaders.sass = webpack.loader(logger)
    app.build.items.sass = await webpack.item(logger)
    app.build.setRule('sass', {
      test: app => app.store.get('patterns.sass'),
      exclude: app => app.store.get('patterns.modules'),
      use: ({build, isProduction}) =>
        Array.from(
          new Set([
            isProduction ? build.items.minicss : build.items.style,
            build.items.css,
            build.items.postcss ?? undefined,
            build.items['resolve-url'],
            build.items.sass,
          ]),
        ).filter(Boolean),
    })

    // add .scss extension
    app.hooks.on('build.resolve.extensions', extensions => {
      extensions.add('.scss')
      return extensions
    })
  },

  /**
   * Extension boot callback
   *
   * @param app - Bud instance
   * @param logger - Bud logger
   */
  async boot(app, logger): Promise<void> {
    logger.await('configuring postcss')
    postcss.configure(app)
    postcss.verify(app, logger)
    logger.complete('configuring postcss')
  },
}
