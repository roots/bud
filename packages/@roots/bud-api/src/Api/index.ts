import * as Framework from '@roots/bud-framework'
import {bind, chalk, lodash} from '@roots/bud-support'

import {
  immediateExecution,
  Repository,
  repository,
} from '../Repository'

const {isEmpty, isFunction} = lodash

/**
 * API service
 *
 * @remarks
 * The API class binds all the facade functions provided by the package
 * and exposes them as a single object.
 *
 * @public
 */
export class Api
  extends Framework.Service<Repository>
  implements Framework.Api
{
  /**
   * Calls queue
   * @public
   */
  public queue: Array<[string, ...any[]]> = []

  /**
   * Record of all completed calls
   * @public
   */
  public trace: Array<[string, ...any[]]> = []

  /**
   * Repository of high-level functions intended
   * for use through the framework and the enduser
   * config files.
   *
   * @override @internal
   */
  public repository: Repository = repository

  /**
   * Service bootstrap event
   *
   * @public
   */
  @bind
  public async bootstrap() {
    this.every(this.bindProxy).every(this.bindToApi)
    this.app.container(immediateExecution).every(this.bindToBud)
  }

  /**
   * @public
   */
  @bind
  public async registered() {
    await this.callAll()

    this.app.hooks.promise(
      'event.build.make.before',
      async app => {
        await app

        app.log('event.build.make.promise api calls')

        await this.callAll()
        this.dump(app)

        return app
      },
    )
  }

  /**
   * @public
   */
  @bind
  public bindToApi(name, method) {
    this[name] = method.bind(this.app)
  }

  /**
   * @public
   */
  @bind
  public bindToBud(name: string, method: CallableFunction) {
    this.app[name] = method.bind(this.app)
  }

  /**
   * @public
   */
  @bind
  public bindProxy(name: string) {
    this.app[name] = function (
      this: Framework.Framework,
      ...args: any[]
    ): Framework.Framework {
      this.api.log('log', {
        message: `enqueueing ${chalk.cyan(name)}`,
        suffix: JSON.stringify(args),
      })

      this.api.queue.push([name, args])

      return this
    }.bind(this.app)
  }

  /**
   * @public
   */
  @bind
  public async call(name: string, ...args: any[]) {
    this.log('log', {
      message: `executing ${chalk.blue(name)}`,
      suffix: !isEmpty(args) ? JSON.stringify(args) : 'none',
    })

    // get a reference to the callable
    const method = this[name]

    // check if the callable exists
    if (!isFunction(method)) {
      throw new Error(`${name} is not a method`)
    }

    // execute the callable
    return await method(...args)
  }

  /**
   * @public
   */
  @bind
  public async callAll() {
    if (!this.queue.length) return

    this.log(
      'await',
      `Executing ${this.queue.length} enqueued functions`,
    )

    // execute all enqueued function calls
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

    // reset calls
    this.queue = []
  }

  /**
   * debug logger
   *
   * @public
   */
  @bind
  public dump(options: any) {
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
