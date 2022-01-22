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
     * @deprecated
     * Please remove this function from your config file. It is not needed.
     * When Sage 10 exits beta this function call will break your build.
     *
     * @returns Framework
     *
     * @public
     */
    setPublicPath: (
      publicPath: string | ((publicPath: string) => string),
    ) => Framework
  }

  interface Modules {
    '@roots/sage': typeof Sage
  }
}

export const {name, boot} = Sage
