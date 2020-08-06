import type {Bud, Scss} from './types'

const scss: Scss = function (this: Bud, enabled: boolean): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.scss', enabled},
    `bud.scss called`,
  )

  this.features.set(
    'scss',
    this.hooks.filter('filter_scss_enabled', enabled ? enabled : true),
  )

  return this
}

export {scss}
