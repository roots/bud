import {Services} from '@roots/bud-framework'
import {Hooks as Base} from '@roots/bud-hooks'
import {bind} from '@roots/bud-support'

import {Bud} from '../../Bud'

/**
 * Hooks service
 *
 * @public
 */
export class Hooks extends Base implements Services.Hooks.Service {
  /**
   * Bootstrap service
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async bootstrap(bud: Bud) {
    Object.assign(this, {store: bud.options.config})

    this.async('build.resolve.alias', async () => ({
      '@src': bud.path('@src'),
      '@dist': bud.path('@dist'),
    }))
    this.on('build.bail', () => bud.isProduction)
    this.on('build.context', () => bud.context.projectDir)
  }
}
