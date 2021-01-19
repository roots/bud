import Service from './Service'
import {Options, Store} from '@roots/bud-typings'

/**
 * Options
 */
export default class extends Service implements Options {
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

  /**
   * Service boot
   */
  public boot(): void {
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
