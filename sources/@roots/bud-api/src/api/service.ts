import type {Bud} from '@roots/bud-framework'
import {ServiceContainer} from '@roots/bud-framework/service'
import type {Api as Contract} from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import isFunction from '@roots/bud-support/lodash/isFunction'

import {factory} from '../facade/facade.factory.js'
import * as methods from '../methods/index.js'

/**
 * API service
 *
 * @remarks
 * Binds facade methods to the framework and provides a way to list them,
 * call them, and otherwise manipulate them.
 */
export class Api extends ServiceContainer implements Contract {
  /**
   * Called methods
   *
   * @public
   */
  public trace: Contract['trace'] = []

  /**
   * Queued method calls
   *
   * @public
   */
  public queue: Contract['queue'] = []

  /**
   * `bootstrap` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async bootstrap?(_app: Bud) {
    Object.entries(methods).map(([k, v]) => this.bindFacade(k, v))
  }

  /**
   * Bind a synchronous facade for use in configs
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public bindFacade(name: string, fn: CallableFunction) {
    if (!isFunction(fn)) {
      throw new Error(
        `bud.api.bindFacade error: ${name} is not a function`,
      )
    }

    this.set(name, fn.bind(this.app))
    this.app.bindMethod(name, factory(this.app, name))
  }

  /**
   * Call an api method directly
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async call(name: string, args: Array<any>): Promise<Bud> {
    this.logger.log(name, `called with args:`, args)

    if (!this.has(name)) {
      throw new Error(`bud.api.call error: ${name} is not a function`)
    }

    try {
      return await this.get(name).call(this.app, ...args)
    } catch (error) {
      throw error
    }
  }

  /**
   * Execute all queued method calls
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async processQueue() {
    const stack = [...this.queue]
    this.queue = []

    await Promise.all(
      stack.map(async value => {
        if (!value) {
          this.logger.warn(`api.processQueue: undefined api call`)
          return
        }

        const [name, args] = value
        await this.call(name, args)
        this.trace.push([name, args])
      }),
    )
  }
}
