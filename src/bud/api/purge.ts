import type {Bud, Purge} from './types'

const purge: Purge = function ({enabled = true, ...options}): Bud {
  const purgeEnabled = enabled ?? true
  purgeEnabled && this.features.enable('purge')

  if (!this.features.enabled('purge')) {
    this.logger.info(
      {name: 'api.purge'},
      'bud.purge called but it is not enabled on this build',
    )
    return this
  }

  this.logger.info({name: 'api.purge', enabled, options}, 'bud.api.purge called')

  const value = {
    ...this.options.get('postCss'),
    plugins: [
      ...this.options.get('postCss').plugins,
      this.services.purgeCss(options),
    ],
  }

  this.options.set('postCss', value)

  return this
}

export {purge}
