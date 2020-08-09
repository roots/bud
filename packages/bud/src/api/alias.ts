import type {Bud, Alias} from './types'

const alias: Alias = function (this: Bud, options: any): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.alias', options},
    `bud.alias called`,
  )

  const aliases = this.hooks.filter('api.alias.filter', options)

  this.options.set('alias', {
    ...this.options.get('aliases'),
    ...aliases,
  })

  return this
}

export {alias}
