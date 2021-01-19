import {Api} from '@roots/bud-typings'

export const storage: Api.Storage = function (path?) {
  if (path) {
    this.options.set('storage', path)
  }

  return this
}
