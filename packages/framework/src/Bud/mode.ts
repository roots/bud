import type Container from '@roots/container'
import type {Configuration} from 'webpack'

/**
 * @see {Webpack.Configuration['mode']}
 */

export default function (build: Container): void {
  this.build = build

  this.get = function () {
    return this.build.get('mode')
  }

  this.is = function (check: Configuration['mode']) {
    return build.is('mode', check)
  }

  this.set = function (mode: Configuration['mode']) {
    return build.set('mode', mode)
  }
}
