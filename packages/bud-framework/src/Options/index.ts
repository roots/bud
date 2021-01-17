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
    this.every(
      (
        prop: string,
        options: {argument?: string; fallback?: any},
      ) =>
        this.source({
          prop,
          argument: options.argument ?? prop,
          fallback: options.fallback ?? false,
        }),
    )
  }

  /**
   * Service boot
   */
  public boot(): void {
    Object.assign(process.env, {
      NODE_ENV: this.get('mode'),
      BABEL_ENV: this.get('mode'),
    })

    this.enabled('log') &&
      !this.is('log', 'true') &&
      !this.is('log', 'false') &&
      this.set('ci', true)
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
  }: {
    prop: Store.Argument
    argument?: Store.Envvar
    fallback?: T | boolean
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
