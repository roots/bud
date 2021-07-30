import type {Repository} from '..'

const publicPath: Repository.PublicPath = function () {
  return this.hooks.filter('build/output/publicPath')
}

export {publicPath}
