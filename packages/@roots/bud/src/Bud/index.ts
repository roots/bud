/**
 * @module @roots/bud
 */

import {
  Bootstrapper,
  Extension,
  Framework,
  Module,
  Plugin,
  Service,
  Store,
} from '@roots/bud-framework'

/**
 * @interface Bud
 */
declare interface Bud extends Framework {
  implementation: Framework.Constructor
}

/**
 * @class Bud
 */
class Bud extends Framework {
  public implementation: Framework.Constructor

  public constructor(options: Framework.Options) {
    super(options)

    this.implementation = Bud
  }
}

export {
  Bud,
  Bootstrapper,
  Extension,
  Framework,
  Module,
  Plugin,
  Service,
  Store,
}
