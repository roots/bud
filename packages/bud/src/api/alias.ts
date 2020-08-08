import type {Bud, Alias} from './types'

const alias: Alias = function (this: Bud, options: any): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.alias', options},
    `bud.alias called`,
  )

  this.hooks.call('pre_alias')

  const aliases = this.hooks.filter('api.alias.filter', options)

  this.options.set('alias', aliases)

  this.hooks.call('post_alias')

  return this
}

export {alias}
