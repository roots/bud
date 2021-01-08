import type {Webpack, Framework} from '@roots/bud-typings'
import {Service} from '@roots/bud-support'

export default abstract class extends Service<Framework> {
  public abstract get(): Webpack.Configuration['mode']

  public abstract set(mode: Webpack.Configuration['mode']): void

  public abstract is(
    check: Webpack.Configuration['mode'],
  ): boolean
}
