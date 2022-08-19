import type {Services} from '@roots/bud-framework'
import Base from '@roots/bud-hooks'
import {bind} from 'helpful-decorators'

/**
 * Hooks service
 *
 * @public
 */
export default class Hooks extends Base implements Services.Hooks.Service {
  /**
   * Service label
   *
   * @public
   */
  public static label = `hooks`

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
    this.on(`build.context`, () => this.app.context.basedir)
  }
}
