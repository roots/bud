import * as Framework from '@roots/bud-framework'
import chalk from 'chalk'
import {bind} from 'helpful-decorators'
import {isEmpty, isFunction} from 'lodash-es'

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
export class Api
  extends Framework.ContainerService
  implements Framework.Api.Service
{
  /**
   * Service label
   *
   * @public
   */
  public static label = `api`

  /**
   * Queued method calls
   *
   * @public
   */
  public queue: Array<[string, ...any[]]> = []

  /**
   * Trace of all method calls
   *
   * @public
   */
  public trace: Array<[string, ...any[]]> = []

  /**
   * `bootstrap` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async bootstrap() {
    Object.entries(methods).map(([k, v]) => this.bindFacade(k, v))
  }

  /**
   * `registered` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async registered() {
    await this.processQueue()
    this.app.hooks.action(`config.after`, this.processQueue)
    this.app.hooks.action(`build.before`, this.processQueue)
  }

  /**
   * Bind a synchronous facade for use in configs
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public bindFacade<K extends keyof Api['repository']>(
    name: K & string,
    fn: Api['repository'][K],
  ) {
    // check if the callable exists
    if (!isFunction(fn)) {
      this.app.error(
        `bud.api.bindFacade error`,
        `${name} is not a function`,
      )
    }

    this.set(name, fn.bind(this.app))
    this.app.bindMethod({[`${name}`]: factory(name)})
  }

  /**
   * Call an api method directly
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async call(name: string, ...args: any[]) {
    this.app.log(
      chalk.blue(name),
      args && !isEmpty(args)
        ? this.app.json.stringify(args)
        : `(no arguments passed)`,
    )

    if (!this.has(name) || !this.isFunction(name)) {
      this.app.error(
        `bud.api.bindFacade error`,
        `${name} is not a function`,
      )
    }

    return await this.get(name).call(this.app, ...args)
  }

  /**
   * Execute all queued method calls
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async processQueue() {
    await Promise.all(
      this.queue.map(async ([name, args], i) => {
        this.trace.push([name, ...args])
        delete this.queue[i]

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
  }
}
