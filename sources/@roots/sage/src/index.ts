// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * This preset configures Bud for use with the Sage starter theme
 *
 * @see https://github.com/roots/bud
 * @see https://github.com/roots/sage
 *
 * @packageDocumentation
 */

import {Sage} from './sage.preset'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * setPublicPath
     *
     * @deprecated Please remove this function from your config file. It is not needed.
     * @returns Framework
     *
     * @public
     */
    setPublicPath: () => Framework
  }

  interface Modules {
    '@roots/sage': typeof Sage
  }
}

export const {name, boot} = Sage
