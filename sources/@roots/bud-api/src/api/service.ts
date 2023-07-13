import type {Api as BudApi} from '@roots/bud-framework'
import type {Bud} from '@roots/bud-framework'

import {ServiceContainer} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Repository} from '../repository.js'

import * as methods from '../methods/index.js'

/**
 * API service
 *
 * @remarks
 * Binds facade methods to the framework and provides a way to list them,
 * call them, and otherwise manipulate them.
 */
export class Api extends ServiceContainer implements BudApi {
  /**
   * {@link BudApi.label}
   */
  public override label: BudApi[`label`] = `api`

  /**
   * Bind a synchronous facade for use in configs
   */
  @bind
  public bindFacade(
    name: `${keyof Repository & string}`,
    fn: CallableFunction,
  ) {
    if (!isFunction(fn)) {
      throw new BudError(
        `bud.api.bindFacade error: ${name} is not a function`,
      )
    }

    this.set(name, fn.bind(this.app))
    this.app.set(name, (...args: Array<any>) => {
      const result = fn.bind(this.app)(...args)
      if (result instanceof Promise) {
        this.app.promised.push(result)
      }
      return this.app
    })
  }

  /**
   * `bootstrap` callback
   */
  public override async bootstrap?(app: Bud) {
    Object.entries(methods).map(([k, v]) => this.bindFacade(k as any, v))
  }
}
