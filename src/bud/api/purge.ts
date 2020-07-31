import type {Bud, Purge} from './types'

const purge: Purge = function ({enabled = true, ...options}): Bud {
  const purgeEnabled = enabled ?? true
  purgeEnabled && this.features.enable('purge')

  if (this.features.enabled('purge')) {
    this.options.set('postCss', {
      plugins: [
        ...this.options.get('postCss').plugins,
        require('@fullhuman/postcss-purgecss')(options),
      ],
    })
  }

  return this
}

export {purge}
