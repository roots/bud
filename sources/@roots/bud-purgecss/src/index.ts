// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @roots/bud-purgecss
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type {purgecss} from '@roots/bud-purgecss/facade'

import BudPurgeCSS from '@roots/bud-purgecss/extension'

import type {BudPurgeCSSPublicInterface} from './extension/model.js'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Purge unused CSS from compiled stylesheets
     *
     * @remarks
     * For more information, see [the PurgeCSS API](https://purgecss.com/configuration.html)
     *
     * @example
     * ```js
     * app.purgecss({
     *   content: [app.path('resources/views/**')],
     *   safestlist: require('purgecss-with-wordpress').safelist,
     * })
     * ```
     */
    purge: BudPurgeCSSPublicInterface

    /**
     * Purge unused CSS from compiled stylesheets
     *
     * @deprecated
     * Use {@link Bud.purge} instead.
     *
     * @example
     * ```js
     * bud.purge
     *  .setContent([bud.path('resources/views/**')])
     *  .setSafelist((await import('purgecss-with-wordpress')).safelist)
     * ```
     */
    purgecss: purgecss
  }

  interface Modules {
    '@roots/bud-purgecss': BudPurgeCSS
  }
}

export {BudPurgeCSS as default}
