import Service from './Service'
import {Mode, Webpack} from '@roots/bud-typings'

export default class extends Service implements Mode {
  /**
   * Service registration
   */
  public register(): void {
    //
  }

  /**
   * Service boot
   */
  public boot(): void {
    //
  }

  /**
   * Get mode
   */
  public get(): Webpack.Configuration['mode'] {
    return this.app.store.get('args.mode')
  }

  /**
   * Set mode
   */
  public set(mode: Webpack.Configuration['mode']): void {
    this.app.store.set('args.mode', mode)
  }

  /**
   * Conditional check
   */
  public is(check: Webpack.Configuration['mode']): boolean {
    return this.app.store.is('args.mode', check)
  }
}
