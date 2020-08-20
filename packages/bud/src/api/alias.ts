import type {Bud} from './types'

type Alias = (this: Bud, options: any) => Bud

const alias: Alias = function (options) {
  const aliases = this.hooks.filter('api.alias.filter', options)

  this.options.set('alias', {
    ...this.options.get('alias'),
    ...aliases,
  })

  return this
}

export {alias}
export type {Alias}
