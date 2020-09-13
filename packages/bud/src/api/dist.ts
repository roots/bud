import {Api} from '@roots/bud-types'

const dist: Api.Dist = function (path?: string) {
  return path
    ? this.fs.resolve(this.paths.get('dist'), path)
    : this.paths.get('dist')
}

export {dist}
