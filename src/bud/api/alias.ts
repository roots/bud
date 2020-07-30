import type {Bud, Alias} from './types'

const alias: Alias = function (this: Bud, options: object): Bud {
  this.hooks.call('pre_alias', options)

  this.options.merge('alias', options)

  this.hooks.call('post_alias')

  return this
}

export {alias}
