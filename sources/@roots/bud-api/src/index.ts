// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Repository of high-level facades which simplify common configuration tasks
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Api, Facade} from './api/index.js'

declare module '@roots/bud-framework' {
  interface Bud extends Facade {}
}

export {Api, Api as Service, Api as default, Facade}
