import type {Bud} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

const {isFunction} = lodash

export class Base {
  private _app: () => Bud

  public get app() {
    return this._app()
  }

  public constructor(_app: () => Bud) {
    this._app = _app
  }

  public wrap<T = any>(
    input: T | ((app: Bud) => T),
  ): (app: Bud) => T {
    return isFunction(input) ? input : () => input
  }
  public unwrap<T = any>(
    input: T | ((app: Bud, ...options: Array<any>) => T),
    ...options: Array<any>
  ): T {
    return isFunction(input) ? input(this.app, ...options) : input
  }
}
