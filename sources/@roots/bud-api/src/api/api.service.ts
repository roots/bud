import * as Framework from '@roots/bud-framework'
import {bind, chalk, lodash} from '@roots/bud-support'

import * as facade from './facade'
import * as methods from './methods'

const {isEmpty, isFunction} = lodash

/**
 * API service
 *
 * @remarks
 * Binds facade methods to the framework and provides a way to list them,
 * call them, and otherwise manipulate them.
 *
 * @public
 */
export class Api extends Framework.Service implements Framework.Api {
  /**
   * Queued method calls
   *
   * @internal
   */
  public queue: Array<[string, ...any[]]> = []

  /**
   * Trace of all method calls
   *
   * @internal
   */
  public trace: Array<[string, ...any[]]> = []

  /**
   * Service bootstrap event
   *
   * @internal
   */
  @bind
  public async bootstrap() {
    this.setStore(
      Object.entries(methods).reduce(
        (a, [k, v]) => ({...a, [k]: v.bind(this.app)}),
        {},
      ),
    )
      .getKeys()
      .map(this.bindFacade)
  }

  /**
   * Service registered event
   *
   * @internal
   */
  @bind
  public async registered() {
    await this.processQueue()
    this.app.hooks.action('event.build.before', this.processQueue)
  }

  /**
   * @internal
   */
  @bind
  public bindFacade(name: string) {
    this.app.bindMethod({[`${name}`]: facade.factory(name)})
  }

  /**
   * Call an api method directly
   *
   * @public
   */
  @bind
  public async call(name: string, ...args: any[]) {
    this.log('log', {
      message: `executing ${chalk.blue(name)}`,
      suffix:
        args && !isEmpty(args) ? this.app.json.stringify(args) : 'none',
    })

    // get a reference to the callable
    const method = this.get(name)

    // check if the callable exists
    if (!isFunction(method)) {
      throw new Error(`${name} is not a method`)
    }

    // execute the callable
    return await method(...args)
  }

  /**
   * Execute all queued method calls
   *
   * @public
   */
  @bind
  public async processQueue() {
    if (!this.queue.length) return

    this.log('await', `Executing ${this.queue.length} enqueued functions`)

    await Promise.all(
      this.queue.map(async ([name, args]) => {
        this.trace.push([name, ...args])

        try {
          await this.call(name, ...args)
        } catch (error) {
          throw new Error(error)
        }
      }),
    )

    this.queue = []
  }

  /**
   * Dump the method call trace
   *
   * @public
   */
  @bind
  public dump() {
    this.app.dump(
      this.trace.reduce(
        (a, t) => [
          ...a,
          {
            method: t[0],
            arguments: isEmpty(t[1]) ? 'none' : t[1],
          },
        ],
        [],
      ),
      {
        prefix: `${this.app.name} config traced calls`,
        printBasicPrototype: false,
        callToJSON: true,
        min: true,
      },
    )
  }
}
