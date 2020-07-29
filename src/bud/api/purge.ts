import type {Bud, Purge} from './types'

const purge: Purge = function ({enabled = true, ...options}): Bud {
  if (enabled) {
    this.state.features.purge = true
    this.state.features.postCss = true

    this.state.options.postCss.plugins = [
      ...this.state.options.postCss.plugins,
      require('@fullhuman/postcss-purgecss')(options),
    ]
  }

  return this
}

export {purge}
