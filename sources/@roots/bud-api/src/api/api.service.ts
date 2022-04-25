import * as Framework from '@roots/bud-framework'
import {bind, chalk, lodash} from '@roots/bud-support'

import * as facade from '../facade'
import * as methods from '../methods'

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
export class Api
  extends Framework.ContainerService
  implements Framework.Api.Service
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
    Object.entries(methods).map(([k, v]) => this.bindFacade(k, v))
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
  public bindFacade<K extends `${keyof Api['repository'] & string}`>(
    name: K,
    fn: Api['repository'][K],
  ) {
    this.set(name, fn.bind(this.app))
    this.app.bindMethod({[`${name}`]: facade.factory(name)})
  }

  /**
   * Call an api method directly
   *
   * @public
   */
  @bind
  public async call(name: string, ...args: any[]) {
    this.app.log({
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

    this.app.log(`Executing ${this.queue.length} enqueued functions`)

    await Promise.all(
      this.queue.map(async ([name, args]) => {
        this.trace.push([name, ...args])

        try {
          await this.call(name, ...args)
        } catch (error) {
          this.app.error(
            `Error calling`,
            name,
            `with args`,
            args,
            `\nerror:`,
            error,
          )
        }
      }),
    )

    this.queue = []
  }
}
