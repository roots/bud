import type {Bud} from './types'

type Alias = (this: Bud, options: any) => Bud

const alias: Alias = function (options) {
  this.options.set('alias', {
    ...this.options.get('alias'),
    ...this.hooks.filter('api.alias.filter', options),
  })

  return this
}

export {alias}
export type {Alias}
