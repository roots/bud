import Framework from '@roots/bud-typings'
import type {Configuration} from 'webpack'

export {Mode, Mode as default}

class Mode implements Framework.Mode.Contract {
  bud: Framework.Bud.Contract

  public constructor(bud: Framework.Bud.Contract) {
    this.bud = bud
  }

  get(): Configuration['mode'] {
    return this.bud.config.get('mode')
  }

  set(mode: Configuration['mode']): Framework.Bud.Contract {
    this.bud.config.set('mode', mode)

    return this.bud
  }

  is(check: Configuration['mode']): boolean {
    return this.bud.config.is('mode', check)
  }
}
