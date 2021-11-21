// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Repository of high-level facades which simplify common configuration tasks
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Api} from './api'
import {ConfigFacade} from './api/api.config'

declare module '@roots/bud-framework' {
  interface Framework extends ConfigFacade {}
}

export {Api, ConfigFacade}
