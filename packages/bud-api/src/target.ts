import {Api} from '@roots/bud-typings'

export const target: Api.Target = function (target) {
  this.store.get('config').set('target', target)

  return this
}
