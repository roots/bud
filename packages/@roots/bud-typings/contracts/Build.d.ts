import {Framework, Service} from './'
import Webpack from 'webpack'

/**
 * ## bud.build
 *
 * Webpack configuration builder for the @roots/bud framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Build extends Service {
  /**
   * ## bud.build.make
   *
   * Produce a final webpack config.
   */
  config: Webpack.Configuration
}
