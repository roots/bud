import {Api} from '@roots/bud-typings'

export const target: Api.Target = function (target) {
  this.hooks.on('config.target', () => target)

  return this
}
