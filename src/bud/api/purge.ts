import type {Bud, Purge} from './types'

const purge: Purge = function ({enabled = true, ...options}): Bud {
  this.features.set({purge: enabled ?? true})

  if (this.features.enabled('purge')) {
    this.options.merge('postCss', {
      plugins: [
        ...this.options.get('postCss').plugins,
        require('@fullhuman/postcss-purgecss')(options),
      ],
    })
  }

  return this
}

export {purge}
