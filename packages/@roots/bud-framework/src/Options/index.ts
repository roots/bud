import Service from './Service'
import {Options, Store} from '@roots/bud-typings'

/**
 * Options
 */
export default class extends Service implements Options {
  public name = 'options'
  /**
   * Service registration
   */
  public register(): void {
    this.source.bind(this)
    this.boot.bind(this)

    this.getEntries().forEach(([name, entry]) => {
      this.source({
        prop: name,
        argument: entry.argument ?? name,
        fallback: entry.fallback ?? false,
      })
    })
  }

  public positional(positional: string): boolean {
    return this.app.store.get('args._').includes(positional)
  }

  /**
   * Service boot
   */
  public boot(): void {
    this.positional('production') &&
      this.positional('development') &&
      this.app['error'](
        'Mode must be set to either production or development',
        'Mode misconfigured',
      )

    this.positional('production') &&
      this.set('mode', 'production')

    this.positional('development') &&
      this.set('mode', 'development')

    Object.assign(process.env, {
      NODE_ENV: this.get('mode'),
      BABEL_ENV: this.get('mode'),
    })
  }

  /**
   * Initial configuration options
   *
   * CLI overrides env
   * Env overrides defaults
   */
  protected source<T = any>({
    prop,
    argument,
    fallback = false,
  }): this {
    this.set(
      prop,
      this.app.store.get(`env.${argument}` as Store.Keys) ??
        this.app.store.get(`args.${argument}` as Store.Keys) ??
        fallback,
    )

    return this
  }
}
