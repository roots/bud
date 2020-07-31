import type {Bud, Alias} from './types'

const alias: Alias = function (this: Bud, options: object): Bud {
  this.hooks.call('pre_alias')

  const aliases = this.hooks.filter('filter_api_alias', options)

  this.options.set('alias', aliases)

  this.hooks.call('post_alias')

  return this
}

export {alias}
