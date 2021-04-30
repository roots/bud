import type {
  Cache,
  Discovery,
  Env,
  Hooks,
  Logger,
  Server,
} from '@roots/bud-typings'
import {Core} from './Core'
import _ from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'

export abstract class Framework extends Core {
  [key: string]: any

  public name = 'bud'

  public abstract cache: Cache

  public abstract discovery: Discovery

  public abstract env: Env

  public abstract hooks: Hooks

  public abstract server: Server

  public abstract logger: Logger

  /**
   * Subscribe
   */
  @bind
  public subscribe<T = any>(
    name: `${Hooks.Name}`,
    caller?: string,
  ): T {
    return this.hooks.filter<T>(caller ? [caller, name] : name)
  }

  /**
   * Publish
   */
  @bind
  public publish(
    pubs: Hooks.PublishDict,
    caller?: string,
  ): Framework {
    Object.entries(pubs).map(
      ([name, pub]: [`${Hooks.Name}`, any]) => {
        this.hooks.on(caller ? [caller, name] : name, pub)
      },
    )

    return this
  }

  /**
   * ## access
   *
   * If a value is a function it will call that
   * function and return the result.
   *
   * If the value is not a function it will return its value.
   *
   * ```js
   * const isAFunction = (option) => `option value: ${option}`
   * const isAValue = 'option value: true'
   *
   * access(isAFunction, true)
   * // => `option value: true`
   *
   * access(isAValue)
   * // => `option value: true`
   * ```
   */
  @bind
  public access<I = any>(value: ((app: Framework) => I) | I): I {
    return _.isFunction(value)
      ? (value as CallableFunction)(this)
      : value
  }

  /**
   * ## pipe [💁 Fluent]
   *
   * Execute an array of functions. The first is passed the
   * bud object Each will be the result of
   * the one preceeding it.
   *
   * Returns the final result.
   *
   * ### Usage
   *
   * ```js
   * app.pipe([
   *   bud => app.path('src'),
   *   bud => app.proxy(),
   * ])
   * ```
   */
  @bind
  public pipe<I = any, R = any>(
    fns: CallableFunction[],
    value: I,
  ): R {
    return (value = fns.reduce((val, fn) => {
      return fn(val)
    }, value))
  }

  /**
   * Sequence functions
   */
  @bind
  public sequence(
    fns: Array<(app: Framework) => any>,
  ): Framework {
    fns.reduce((_val, fn) => {
      return fn.bind(this)(this)
    }, this)

    return this
  }

  /**
   * ## when  [💁 Fluent]
   *
   * Executes a function if a given test is `true`.
   *
   * - The first parameter is the conditional check.
   *     - It can be a boolean statement (app.inDevelopment)
   *     - It can be a fn, which is passed the app and returns the boolean
   *
   * - The second parameter is the function to be run if `true`.
   *
   * - The third paramter is optional; ran if not `true`.
   *
   * ### Usage
   *
   * ```js
   * app.when(app.mode.is('production'), () => app.vendor())
   * ```
   */
  @bind
  public when(
    test: ((app: Framework) => boolean) | boolean,
    trueCase: (app: Framework) => any,
    falseCase?: (app: Framework) => any,
  ): Framework {
    this.access(test)
      ? trueCase && _.isFunction(trueCase) && trueCase(this)
      : falseCase && _.isFunction(falseCase) && falseCase(this)

    return this
  }

  @bind
  public log(...args) {
    this.logger.instance.scope(this.name).log(...args)
  }

  @bind
  public info(...args) {
    this.logger.instance.scope(this.name).info(...args)
  }

  @bind
  public warning(...args) {
    this.logger.instance.scope(this.name).warning(...args)
  }

  @bind
  public debug(...args) {
    this.logger.instance.scope(this.name).debug(...args)
  }

  @bind
  public error(...args) {
    this.logger.instance.scope(this.name).error(...args)
  }
}
