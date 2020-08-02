import type {Bud, Purge} from './types'

const purge: Purge = function ({enabled = true, ...options}): Bud {
  const purgeEnabled = enabled ?? true
  purgeEnabled && this.features.enable('purge')

  if (! this.features.enabled('purge')) {
    this.logger.info({name: 'api'}, 'bud.purge called but it is not enabled on this build')
    return this
  }

  const value = {
    plugins: [
      ...this.options.get('postCss').plugins,
      require('@fullhuman/postcss-purgecss')(options),
    ],
  }

  this.options.set('postCss', value)
  this.logger.info({name: 'api', value}, 'bud.purge called')

  return this
}

export {purge}
