import * as Framework from '@roots/bud-framework'

import {makeAcornCompat} from './acorn'
import * as ThemeJSON from './theme/extension'

interface Sage extends Framework.Extension.Module {}

/**
 * @public
 */
const Sage: Sage = {
  /**
   * @public
   */
  label: '@roots/sage',

  /**
   * @public
   */
  boot: async app => {
    /* Acorn concerns */
    makeAcornCompat(app)

    /* Add theme.json extension */
    await app.extensions.add(ThemeJSON)

    /* Set application paths */
    app.setPath({
      '@src': 'resources',
      '@dist': 'public',
      '@resources': '@src',
      '@public': '@dist',
      '@fonts': '@src/fonts',
      '@images': '@src/images',
      '@scripts': '@src/scripts',
      '@styles': '@src/styles',
      '@views': '@src/views',
    })

    /* Set application client aliases */
    app.alias({
      '@fonts': app.path('@fonts'),
      '@images': app.path('@images'),
      '@scripts': app.path('@scripts'),
      '@styles': app.path('@styles'),
    })

    /* Create vendor chunk(s) */
    app.splitChunks()

    /* Environment specific configuration */
    app.when(
      app.isProduction,
      () => app.minimize().hash().runtime('single'),
      () => app.devtool(),
    )
  },
}

export {Sage}
