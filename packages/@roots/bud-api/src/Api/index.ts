import * as Framework from '@roots/bud-framework'
import chalk from 'chalk'
import {bind} from 'helpful-decorators'
import {isEmpty, isFunction} from 'lodash'

import {
  immediateExecution,
  Repository,
  repository,
} from '../Repository'

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

    this.app.hooks.promise('build.make', async app => {
      await app

      app.log('build.make.promise api calls')

      await this.callAll()
      this.dump(app)

      return app
    })
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
      this.api.log('info', {
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
    this.log('info', {
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
    await method(...args)
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
        await this.call(name, ...args)
        this.trace.push([name, args])
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
  public async dump(app: Framework.Framework) {
    app.dump(
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
        prefix: `${app.name} config traced calls`,
        printBasicPrototype: false,
        callToJSON: true,
        min: true,
      },
    )

    return app
  }
}
