import type {Services} from '@roots/bud-framework'
import Base from '@roots/bud-hooks'
import {bind} from 'helpful-decorators'

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
  public async bootstrapped() {
    this.async(`build.resolve.alias`, async () => ({
      '@src': this.app.path(`@src`),
      '@dist': this.app.path(`@dist`),
    }))
    this.on(`build.bail`, () => this.app.isProduction)
    this.on(`build.context`, () => this.app.context.dir)
  }
}
