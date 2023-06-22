// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * The Dashboard package implements the Bud.Dashboard interface.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import {Dashboard as Service} from './service.js'

declare module '@roots/bud-framework' {
  type Dashboard = Service
}

export {Service as default}
