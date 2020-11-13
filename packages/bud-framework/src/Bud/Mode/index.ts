import type {Bud} from '..'
import type {Configuration} from 'webpack'

export {Mode, Mode as default}

/**
 * @constructs Mode
 */
class Mode implements Mode.Contract {
  bud: Bud.Contract

  public constructor(bud: Bud.Contract) {
    this.bud = bud
  }

  get(): Configuration['mode'] {
    return this.bud.config.get('mode')
  }

  set(mode: Configuration['mode']): Bud.Contract {
    this.bud.config.set('mode', mode)

    return this.bud
  }

  is(check: Configuration['mode']): boolean {
    return this.bud.config.is('mode', check)
  }
}

namespace Mode {
  export interface Contract {
    get(): Configuration['mode']

    set(mode: Configuration['mode']): Bud.Contract

    is(check: Configuration['mode']): boolean
  }
}
