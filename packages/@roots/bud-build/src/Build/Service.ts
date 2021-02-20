import {Service} from '@roots/bud-framework'
import type {Webpack, Build} from '@roots/bud-typings'

export default abstract class extends Service implements Build {
  /**
   * Generate webpack config object.
   */
  public abstract make(): Webpack.Configuration
}
