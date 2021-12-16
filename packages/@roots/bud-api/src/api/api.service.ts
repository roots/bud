import * as Framework from '@roots/bud-framework'
import {bind, chalk, lodash} from '@roots/bud-support'

import * as facade from './facade'
import * as methods from './methods'
import * as immediate from './methods/immediate'

const {isEmpty, isFunction} = lodash

/**
 * API service
 *
 * @remarks
 * Binds facade methods to the framework
 * and provides a means to call the methods
 * directly for immediate execution.
 *
 * @public
 */
export class Api
  extends Framework.Service
  implements Framework.Api
{
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

    this.getKeys().map(key => this.bindFacade(key))

    this.app.bindMethod(immediate)
  }

  /**
   * Service registered event
   *
   * @internal
   */
  @bind
  public async registered() {
    await this.processQueue()

    this.app.hooks.async<'event.build.make.before'>(
      'event.build.make.before',
      async app => {
        this.log('log', 'processing queue prior to final build')
        await this.processQueue()

        this.dump()
        return app
      },
    )
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
        args && !isEmpty(args) ? JSON.stringify(args) : 'none',
    })

    // get a reference to the callable
    const method = this.get(name)

    // check if the callable exists
    if (!isFunction(method)) {
      this.log('error', {
        message: 'error calling api method',
        suffix: `${name} is not a method of ${this.app.name}`,
      })
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

    this.log(
      'await',
      `Executing ${this.queue.length} enqueued functions`,
    )

    await Promise.all(
      this.queue.map(async ([name, args]) => {
        this.trace.push([name, ...args])

        try {
          await this.call(name, ...args)
        } catch (error) {
          this.log('error', {
            message: 'error processing queued api calls',
            suffix: error,
          })
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
