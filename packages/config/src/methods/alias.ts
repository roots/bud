import {Config} from '..'

export const alias: Config.Alias = function (aliases) {
  this.store['build'].merge('resolve.alias', aliases)

  return this
}
