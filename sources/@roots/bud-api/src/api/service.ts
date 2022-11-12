import {ServiceContainer} from '@roots/bud-framework/service'
import type {Service as Contract} from '@roots/bud-framework/services/api'
import {bind} from '@roots/bud-support/decorators'
import {isEmpty, isFunction} from '@roots/bud-support/lodash-es'
import chalk from 'chalk'

import {factory} from '../facade/facade.factory.js'
import * as methods from '../methods/index.js'

/**
 * API service
 *
 * @remarks
 * Binds facade methods to the framework and provides a way to list them,
 * call them, and otherwise manipulate them.
 *
 * @public
 */
export class Api extends ServiceContainer implements Contract {
  /**
   * Service label
   *
   * @public
   */
  public static override label = `api`

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
  public override async bootstrap() {
    Object.entries(methods).map(([k, v]) => this.bindFacade(k, v))
  }

  /**
   * `registered` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async registered() {
    await this.processQueue()
  }

  /**
   * Bind a synchronous facade for use in configs
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public bindFacade(name: string, fn: CallableFunction) {
    // check if the callable exists
    if (!isFunction(fn)) {
      throw new Error(
        `bud.api.bindFacade error: ${name} is not a function`,
      )
    }

    this.set(name, fn.bind(this.app))
    this.app.bindMethod(name, factory(name))
  }

  /**
   * Call an api method directly
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async call(name: string, args: any[]) {
    this.app.log(
      chalk.blue(name),
      args && !isEmpty(args)
        ? this.app.fs.json.stringify(args)
        : `(no arguments passed)`,
    )

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
    this.logger.info(`processing ${this.queue.length} queued calls`)

    await Promise.all(
      this.queue?.map(async ([name, args], index) => {
        await this.call(name, args)
        this.trace?.push(this.queue[index])
        delete this.queue[index]
        this.queue = this.queue.filter(Boolean)
      }),
    )
  }
}
