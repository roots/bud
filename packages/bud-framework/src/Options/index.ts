import Service from './Service'
import {lodash} from '@roots/bud-support'
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
  }

  /**
   * ## container.set
   *
   * Set a value on a container item.
   *
   * ### Usage
   *
   * ```js
   * container.set('key', value)
   * ```
   */
  public set(key: string, value: any): this {
    this.app.logger.info({[key]: value, msg: 'Set option'})
    lodash.set(this.repository, key, value)

    return this
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
