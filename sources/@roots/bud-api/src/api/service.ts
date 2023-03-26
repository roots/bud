import type {Bud} from '@roots/bud-framework'
import {ServiceContainer} from '@roots/bud-framework/service'
import type {Api as Contract} from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import {BudError, InputError} from '@roots/bud-support/errors'
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
   */
  public trace: Contract['trace'] = []

  /**
   * Queued method calls
   */
  public queue: Contract['queue'] = []

  /**
   * `bootstrap` callback
   */
  @bind
  public override async bootstrap?(_app: Bud) {
    Object.entries(methods).map(([k, v]) => this.bindFacade(k, v))
  }

  /**
   * Bind a synchronous facade for use in configs
   */
  @bind
  public bindFacade(name: string, fn: CallableFunction) {
    if (!isFunction(fn)) {
      throw new BudError(
        `bud.api.bindFacade error: ${name} is not a function`,
      )
    }

    this.set(name, fn.bind(this.app))
    this.app.bindMethod(name, factory(this.app, name))
  }

  /**
   * Call an api method directly
   */
  @bind
  public async call(name: string, args: Array<any>): Promise<Bud> {
    this.logger.info(`bud.api.call: ${name}`, ...args)

    if (!this.has(name)) {
      throw new InputError(`${name} is not a function`)
    }

    return await this.get(name).call(this.app, ...args)
  }

  /**
   * Execute all queued method calls
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
