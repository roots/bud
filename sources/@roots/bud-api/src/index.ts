// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Repository of high-level facades which simplify common configuration tasks
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Api, Facade} from './api'

declare module '@roots/bud-framework' {
  interface Framework extends Facade {}
}

export {Api, Facade}
