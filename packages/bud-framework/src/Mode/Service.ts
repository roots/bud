import type {Webpack} from '@roots/bud-typings'
import {Service} from '@roots/bud-support'
import Framework from '../Framework'

export default abstract class extends Service<Framework> {
  _mode: Webpack.Configuration['mode']

  _ci: boolean

  public get mode(): Webpack.Configuration['mode'] {
    return this._mode
  }

  public set mode(mode: Webpack.Configuration['mode']) {
    this._mode = mode
  }

  public get ci(): boolean {
    return this._ci
  }

  public set ci(ci: boolean) {
    this._ci = ci
  }

  public abstract get(): Webpack.Configuration['mode']

  public abstract set(mode: Webpack.Configuration['mode']): void

  public abstract is(
    check: Webpack.Configuration['mode'],
  ): boolean
}
