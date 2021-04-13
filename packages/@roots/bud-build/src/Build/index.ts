import type {Build} from '@roots/bud-typings'
import type Webpack from 'webpack'
import {Service} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import * as builders from '../builders'

/**
 * ## bud.build
 *
 * Webpack configuration builder for the @roots/bud framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [📦 @roots/bud-build](https://www.npmjs.com/package/@roots/bud-build)
 */
export default class extends Service implements Build {
  /**
   * Service ident
   */
  public name = '@roots/bud-build'

  /**
   * Framework lifecycle
   */
  @bind
  public registered(): void {
    Object.values(builders).forEach(builder => {
      builder.bind(this.app)()
    })
  }

  /**
   * Make webpack config
   *
   * Produce a final webpack config.
   */
  @bind
  public make(): Webpack.Configuration {
    return this.subscribe('build')
  }
}
