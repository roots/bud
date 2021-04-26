import {Service} from '@roots/bud-framework'
import Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    build: Build
  }

  /**
   * ## bud.build
   *
   * Webpack configuration builder for the @roots/bud framework
   *
   * [🏡 Project home](https://roots.io/bud)
   * [🧑‍💻 git](https://github.com/roots/bud/tree/master/packages/@roots/bud-build)
   * [📦 npm](https://www.npmjs.com/package/@roots/bud-build)
   */
  interface Build extends Service {
    /**
     * ## bud.build.make
     *
     * Produce a final webpack config.
     */
    config: Webpack.Configuration
  }
}
