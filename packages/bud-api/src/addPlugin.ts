import {Api} from '@roots/bud-typings'

export const addPlugin: Api.AddPlugin = function (name, make) {
  this.extensions.set(name, {make})

  return this
}
