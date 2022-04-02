import type {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

const {isFunction} = lodash

export class Base {
  private _app: () => Framework

  public get app() {
    return this._app()
  }

  public constructor(_app: () => Framework) {
    this._app = _app
  }

  public wrap<T = any>(
    input: T | ((app: Framework) => T),
  ): (app: Framework) => T {
    return isFunction(input) ? input : () => input
  }
  public unwrap<T = any>(
    input: T | ((app: Framework, ...options: Array<any>) => T),
    ...options: Array<any>
  ): T {
    return isFunction(input) ? input(this.app, ...options) : input
  }
}
