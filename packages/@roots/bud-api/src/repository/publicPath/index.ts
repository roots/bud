import type {Repository} from '..'

/**
 * @function publicPath
 */
const publicPath: Repository.PublicPath = function () {
  return this.hooks.filter('build/output/publicPath')
}

/**
 * @exports publicPath
 */
export {publicPath}
