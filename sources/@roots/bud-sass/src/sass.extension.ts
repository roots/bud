import type {Bud,Extension} from '@roots/bud-framework'
import type {Signale} from '@roots/bud-support'

import {importSassImplementation} from './sass.dependency'
import * as postcss from './sass.postcss'

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
  async register(app: Bud, logger: Signale) {
    const implementation = await importSassImplementation(logger)

    app.hooks
      .on('build.resolve.extensions', ext => ext.add('.scss').add('.sass'))
      .build.setLoader('sass', require.resolve('sass-loader'))
      .setItem('sass', {
        loader: 'sass',
        options: {implementation, sourceMap: true},
      })
      .setRule('sass', {
        test: app => app.store.get('patterns.sass'),
        include: app => [app.path('@src')],
        use: [`precss`, `css`, `postcss`, `resolveUrl`, `sass`],
      })
  },

  /**
   * Extension boot callback
   *
   * @param app - Bud instance
   * @param logger - Bud logger
   */
  async boot(app, logger): Promise<void> {
    postcss.configure(app)
    postcss.verify(app, logger)
  },
}
