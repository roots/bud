import type {Api} from '@roots/bud-types'

const publicPath: Api.PublicPath = function (dir: string) {
  dir = !dir.match(/\/$/g) ? `${dir}/` : dir
  dir = !dir.match(/\/^/g) ? `/${dir}` : dir

  this.paths.set('public', dir)

  return this
}

export {publicPath}
