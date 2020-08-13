import type {Bud, Alias} from './types'

const alias: Alias = function (this: Bud, options: any): Bud {
  const aliases = this.hooks.filter('api.alias.filter', options)

  this.options.set('alias', {
    ...this.options.get('alias'),
    ...aliases,
  })

  return this
}

export {alias}
